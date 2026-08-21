import type { WorkStatusKind } from "@/content/works";

const dotClass: Record<WorkStatusKind, string> = {
  live: "bg-emerald-600",
  development: "bg-amber-500",
  speaking: "bg-accent",
  personal: "bg-muted",
};

export function StatusBadge({
  kind,
  label,
}: {
  kind: WorkStatusKind;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
      <span
        aria-hidden
        className={`inline-block size-1.5 rounded-full ${dotClass[kind]}`}
      />
      {label}
    </span>
  );
}
