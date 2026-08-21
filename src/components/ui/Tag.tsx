export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
