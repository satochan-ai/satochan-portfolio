/**
 * Hero 限定の装飾レイヤー（Flow Grid Hero / 静止版）。
 * すべて aria-hidden・pointer-events-none で、アクセシビリティツリーへ入れない。
 * 色は Hero 内で完結させ、全サイト向けの新規カラートークンは追加しない。
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* 右側のみのブルーグロー（左のHeadline背後は暗いまま保つ） */}
      <div className="hero-glow hero-glow--primary absolute -right-24 -top-28 size-[26rem]" />
      <div className="hero-glow hero-glow--secondary absolute right-6 top-1/3 hidden size-80 sm:block" />

      {/* 細いグリッド（右側中心。左は mask でほぼ見せない） */}
      <div className="hero-grid absolute inset-y-0 right-0 w-[62%]" />

      {/* 業務フロー / 情報接続を思わせる Flow Network（装飾。右側へ寄せて Headline を避ける） */}
      <svg
        className="hero-flow absolute right-[-40%] top-1/2 h-[125%] w-[86%] -translate-y-1/2 opacity-35 sm:right-[-8%] sm:w-[60%] sm:opacity-55 lg:right-[-1%] lg:w-[46%] lg:opacity-55 xl:opacity-70"
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* paths: 左(入力) → 中(整理・判断) → 右(仕組み) */}
        <path className="hero-flow__path" d="M150 140 C 220 140, 235 220, 290 222" />
        <path className="hero-flow__path" d="M120 250 C 200 250, 240 226, 290 226" />
        <path className="hero-flow__path" d="M175 355 C 240 355, 255 250, 288 236" />
        <path className="hero-flow__path" d="M290 222 C 360 214, 380 188, 445 186" />
        <path className="hero-flow__path" d="M292 230 C 360 260, 390 330, 466 330" />
        <path
          className="hero-flow__path hero-flow__path--dashed"
          d="M275 95 C 290 150, 290 170, 290 210"
        />
        <path
          className="hero-flow__path hero-flow__path--dashed"
          d="M445 185 C 485 185, 498 118, 417 82"
        />

        {/* subtle ring（中央の判断ノード周り） */}
        <circle className="hero-flow__ring" cx="290" cy="225" r="34" />

        {/* 通常ノード */}
        <circle className="hero-flow__node" cx="120" cy="250" r="4" />
        <circle className="hero-flow__node" cx="175" cy="355" r="4" />
        <circle className="hero-flow__node" cx="275" cy="95" r="4" />
        <circle className="hero-flow__node" cx="320" cy="360" r="4" />
        <circle className="hero-flow__node" cx="468" cy="330" r="4" />
        <circle className="hero-flow__node" cx="415" cy="80" r="4" />

        {/* major ノード（入力 / 整理・判断 / 仕組み） */}
        <circle className="hero-flow__node hero-flow__node--major" cx="150" cy="140" r="6" />
        <circle className="hero-flow__node hero-flow__node--major" cx="290" cy="225" r="7" />
        <circle className="hero-flow__node hero-flow__node--major" cx="445" cy="185" r="6" />
      </svg>

      {/* 下部フェード（次セクション Proof の bg-surface へ自然につなぐ） */}
      <div className="hero-fade absolute inset-x-0 bottom-0 h-40" />
    </div>
  );
}
