"use client";
import { Home, FileText, Map, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", icon: Home, end: true },
  { href: "/report", label: "Report", icon: FileText },
  { href: "/map", label: "Map", icon: Map },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              WatchDog <span className="text-primary">Alert</span>
            </span>
          </Link>
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {tabs.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  pathname === t.href
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>

      {/* Mobile bottom nav — big touch targets */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden"
        aria-label="Mobile primary"
      >
        <ul className="grid grid-cols-4">
          {tabs.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-semibold ${
                  pathname === t.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <t.icon className="h-6 w-6" aria-hidden />
                {t.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
