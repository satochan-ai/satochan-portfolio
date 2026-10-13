"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Image from "next/image";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;
type State = "idle" | "loading" | "playing" | "paused" | "ended" | "error";
const statusMessages: Record<State, string> = {
  idle: "音声なし・30秒。再生ボタンを押すと動画を読み込みます。",
  loading: "動画を読み込んでいます。",
  playing: "動画を再生しています。",
  paused: "動画は一時停止中です。",
  ended: "再生が終了しました。もう一度再生できます。",
  error: "動画を読み込めませんでした。上の画像と説明をご確認ください。",
};
type Props = {
  summary: string;
  src: string;
  poster: string;
  posterAlt: string;
  children: ReactNode;
};

export function PortfolioVideo({ summary, src, poster, posterAlt, children }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // 動画枠と再生操作・状態表示をまとめた領域。どこかが見えていれば手動再生を尊重し、すべて画面外なら停止する。
  const playerRef = useRef<HTMLDivElement>(null);
  const playbackAllowed = useRef(false);
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const [opened, setOpened] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<State>("idle");

  const canPlay = () => {
    const bounds = playerRef.current?.getBoundingClientRect();
    return detailsRef.current?.open && !document.hidden && bounds &&
      bounds.bottom > 0 && bounds.top < window.innerHeight;
  };

  useEffect(() => {
    const video = videoRef.current;
    const player = playerRef.current;
    if (!video || !player) return;
    const stop = () => {
      playbackAllowed.current = false;
      video.pause();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    const observer = typeof IntersectionObserver === "undefined" ? undefined :
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) stop();
      });
    observer?.observe(player);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.pause();
    };
  }, []);

  const start = async (fromStart = false) => {
    const video = videoRef.current;
    if (!video || !detailsRef.current?.open || document.hidden) return;
    playbackAllowed.current = true;
    if (!video.getAttribute("src")) {
      video.src = src;
      setLoaded(true);
    }
    if (fromStart || video.ended) video.currentTime = 0;
    setState("loading");
    try {
      await video.play();
    } catch {
      setState(video.error ? "error" : "paused");
    }
  };

  const buttonClass = "rounded-full border border-line px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

  return (
    <details
      ref={detailsRef}
      className="mb-8 rounded-card border border-line bg-surface"
      onToggle={(event) => {
        const open = event.currentTarget.open;
        setOpened(open);
        if (!open) {
          playbackAllowed.current = false;
          videoRef.current?.pause();
        }
      }}
    >
      <summary className="cursor-pointer rounded-card px-5 py-4 text-sm font-semibold leading-relaxed text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-6">
        {summary}
      </summary>
      <div className="border-t border-line p-4 sm:p-6">
        <div className="mx-auto max-w-3xl">
          {children}
          <div ref={playerRef}>
            <div className="relative mt-5 aspect-video overflow-hidden rounded-card bg-[#08111f]">
              {opened && (
                <Image src={poster} alt={posterAlt} width={1280} height={720} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
              )}
              <noscript>
                <Image src={poster} alt={posterAlt} width={1280} height={720} unoptimized loading="lazy" className="absolute inset-0 h-full w-full object-contain" />
              </noscript>
              <video
                ref={videoRef}
                controls={loaded && state !== "error"}
                muted
                playsInline
                preload="none"
                tabIndex={loaded ? 0 : -1}
                aria-label="ポートフォリオ紹介動画（30秒・音声なし）"
                aria-describedby="portfolio-video-description"
                className={`absolute inset-0 h-full w-full object-contain ${!loaded ? "invisible" : ""} ${state === "error" ? "hidden" : ""}`}
                onPlay={() => {
                  // ネイティブcontrolsによる手動再生も許可する。
                  if (canPlay()) playbackAllowed.current = true;
                }}
                onPlaying={() => {
                  if (!playbackAllowed.current || !canPlay()) {
                    videoRef.current?.pause();
                    return;
                  }
                  setState("playing");
                }}
                onPause={() => setState((current) => current === "error" || current === "ended" ? current : "paused")}
                onEnded={() => setState("ended")}
                onError={() => setState("error")}
              />
            </div>
            {hydrated && state !== "error" && (
              <div className="mt-4 flex min-h-11 flex-wrap gap-3">
                <button type="button" className={buttonClass} onClick={() => {
                  if (state === "playing") {
                    playbackAllowed.current = false;
                    videoRef.current?.pause();
                  } else void start();
                }}>
                  {state === "playing" ? "一時停止" : state === "ended" ? "もう一度再生" : "動画を再生"}
                </button>
                {loaded && <button type="button" className={buttonClass} onClick={() => void start(true)}>最初から再生</button>}
              </div>
            )}
            <p role="status" className="mt-3 text-xs leading-relaxed text-muted">
              {hydrated ? statusMessages[state] : "動画の再生にはJavaScriptが必要です。画像と説明で内容をご確認いただけます。"}
            </p>
          </div>
        </div>
      </div>
    </details>
  );
}
