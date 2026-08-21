import Link from "next/link";

import { navItems, site } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-bg/85 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
      >
        本文へスキップ
      </a>
      <div className="mx-auto flex h-16 w-full max-w-page items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-bold tracking-tight sm:text-base"
        >
          {site.name}
          <span className="ml-2 hidden text-xs font-normal text-muted sm:inline">
            {site.tagline}
          </span>
        </Link>

        <nav aria-label="セクション" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="ml-2 rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
