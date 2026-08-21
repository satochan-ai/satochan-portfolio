import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-bg">
      <div className="mx-auto flex w-full max-w-page flex-col gap-2 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-medium text-fg">{site.name}</p>
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
