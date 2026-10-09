import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { NAV, waLink } from "@/lib/business";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#inicio" className="font-display text-lg font-extrabold tracking-tight">
          LAVA CAR <span className="text-gradient">AMIGÃO</span>
        </a>
        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a href={waLink()} target="_blank" rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105 lg:inline-flex">
          <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
        </a>
        <button className="rounded-md p-2 lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Menu móvel" className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-base text-foreground">
              {n.label}
            </a>
          ))}
          <a href={waLink()} target="_blank" rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-4 py-3 font-semibold text-primary-foreground">
            <MessageCircle className="h-4 w-4" /> Agendar pelo WhatsApp
          </a>
        </nav>
      )}
    </header>
  );
}
