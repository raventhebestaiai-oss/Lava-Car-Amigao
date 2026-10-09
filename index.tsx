import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { MessageCircle, MapPin, Phone, Star, ShieldCheck, Sparkles, Smartphone, HeartHandshake, Navigation, Clock } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { Header } from "@/components/site/Header";
import { ContactForm } from "@/components/site/ContactForm";
import { SERVICES } from "@/components/site/services";
import { BUSINESS, HOURS, NAV, mapsEmbed, mapsLink, routeLink, waLink } from "@/lib/business";

const TITLE = "Lava Car Amigão | Lavagem Automotiva em Louveira – SP";
const DESC = "Conheça o Lava Car Amigão, no Centro de Louveira – SP. Entre em contato pelo WhatsApp para consultar os serviços, preços e horários disponíveis.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoWash",
  name: BUSINESS.name,
  telephone: BUSINESS.phoneE164,
  address: { "@type": "PostalAddress", addressLocality: "Louveira", addressRegion: "SP", postalCode: "13290-000", addressCountry: "BR", streetAddress: "Centro" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const btnPrimary = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105";
const btnGhost = "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3.5 font-semibold text-foreground backdrop-blur transition-colors hover:bg-secondary";
const btnGhostHero = "inline-flex items-center justify-center gap-2 rounded-full border border-hero-line bg-hero-surface px-6 py-3.5 font-semibold text-hero-foreground backdrop-blur transition-colors hover:bg-hero-line";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h2>
    </div>
  );
}

function Index() {
  useReveal();
  const year = new Date().getFullYear();
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section id="inicio" className="relative flex min-h-[92vh] items-end overflow-hidden pt-16">
          <img src={heroImg} alt="Carro preto brilhando após a lavagem" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 md:pb-28">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-hero-line bg-hero-surface px-3 py-1 text-sm text-hero-foreground backdrop-blur">
              <MapPin className="h-4 w-4 text-hero-muted" /> Centro de Louveira – SP
            </p>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-hero-foreground md:text-6xl">
              Seu carro limpo, <span className="text-gradient-hero">brilhando</span> e bem cuidado!
            </h1>
            <p className="mt-5 max-w-xl text-lg text-hero-muted">
              Deixe seu veículo com aquele visual de carro novo. Venha conhecer o Lava Car Amigão, no Centro de Louveira.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}><MessageCircle className="h-5 w-5" /> Falar pelo WhatsApp</a>
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={btnGhostHero}><Navigation className="h-5 w-5" /> Como chegar</a>
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
          <SectionTitle eyebrow="Serviços" title="Cuidado para cada detalhe" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="reveal group overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-glow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={944} height={704} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.desc}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">Consulte o preço</span>
                    <a href={waLink(`Olá! Gostaria de saber a disponibilidade e o preço do serviço: ${s.title}.`)} target="_blank" rel="noopener noreferrer"
                      className="rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
                      Consultar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">Consulte pelo WhatsApp quais serviços estão disponíveis.</p>
        </section>

        {/* Por que escolher */}
        <section id="sobre" className="scroll-mt-20 border-y border-border bg-card/40 py-24">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle eyebrow="Sobre nós" title="Por que escolher o Lava Car Amigão?" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: ShieldCheck, t: "Cuidado com o veículo", d: "Tratamos seu carro com o carinho que ele merece." },
                { icon: Sparkles, t: "Atenção aos detalhes", d: "Aquele capricho que faz diferença no resultado." },
                { icon: Smartphone, t: "Facilidade de contato", d: "Fale com a gente direto pelo WhatsApp." },
                { icon: HeartHandshake, t: "Atendimento próximo", d: "Um atendimento amigo, no Centro de Louveira." },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="reveal rounded-3xl border border-border bg-card p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avaliação */}
        <section id="avaliacoes" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-24">
          <SectionTitle eyebrow="Avaliações" title="O que dizem sobre nós" />
          <figure className="reveal rounded-3xl border border-border bg-card p-8 text-center md:p-12">
            <div className="flex justify-center gap-1" aria-label="5 de 5 estrelas">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-7 w-7 fill-star text-star" />)}
            </div>
            <p className="mt-3 font-display text-2xl font-bold">5,0/5 no Google</p>
            <blockquote className="mt-6 text-xl italic md:text-2xl">“Fiz a lavagem completa, ficou muito bom!”</blockquote>
            <figcaption className="mt-4 text-muted-foreground">— Jean Marques, avaliação publicada no Google</figcaption>
            <p className="mt-6 text-xs text-muted-foreground">Nota baseada em 1 avaliação no Google.</p>
          </figure>
        </section>


        {/* Localização */}
        <section id="localizacao" className="scroll-mt-20 border-y border-border bg-card/40 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
            <div className="reveal">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Localização</p>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Estamos esperando por você!</h2>
              <ul className="mt-6 space-y-3 text-lg">
                <li className="font-semibold">{BUSINESS.name}</li>
                <li className="flex items-center gap-3 text-muted-foreground"><MapPin className="h-5 w-5 text-primary" /> Centro, Louveira – SP</li>
                <li className="flex items-center gap-3 text-muted-foreground"><Phone className="h-5 w-5 text-primary" /> <a href={`tel:${BUSINESS.phoneE164}`} className="hover:text-foreground">{BUSINESS.phoneDisplay}</a></li>
              </ul>
              <div className="mt-6 rounded-2xl border border-border bg-background/60 p-5">
                <p className="flex items-center gap-2 font-semibold"><Clock className="h-5 w-5 text-primary" /> Horário de atendimento</p>
                <ul className="mt-3 space-y-1.5 text-muted-foreground">
                  {HOURS.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-4">
                      <span>{h.day}</span>
                      <span className={h.time === "Fechado" ? "text-destructive" : "font-medium text-foreground"}>{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">Os horários podem ser diferentes em feriados.</p>
              </div>
              <a href={routeLink} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-8`}><Navigation className="h-5 w-5" /> Traçar rota</a>
            </div>
            <div className="reveal overflow-hidden rounded-3xl border border-border">
              <iframe title="Mapa do Lava Car Amigão" src={mapsEmbed} className="h-80 w-full md:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-4 py-24 md:grid-cols-2">
          <div className="reveal">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contato</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Vamos deixar seu carro brilhando?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Entre em contato com o Lava Car Amigão para consultar os serviços disponíveis, os preços e os horários de atendimento.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}><MessageCircle className="h-5 w-5" /> Chamar no WhatsApp</a>
              <a href={`tel:${BUSINESS.phoneE164}`} className={btnGhost}><Phone className="h-5 w-5" /> {BUSINESS.phoneDisplay}</a>
            </div>
          </div>
          <div className="reveal"><ContactForm /></div>
        </section>
      </main>

      <footer className="border-t border-border pb-24 pt-12 md:pb-12">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-extrabold">LAVA CAR <span className="text-gradient">AMIGÃO</span></p>
            <p className="mt-2 text-sm text-muted-foreground">{BUSINESS.address}</p>
            <a href={`tel:${BUSINESS.phoneE164}`} className="mt-1 block text-sm text-muted-foreground hover:text-foreground">{BUSINESS.phoneDisplay}</a>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => <a key={n.href} href={n.href} className="text-muted-foreground hover:text-foreground">{n.label}</a>)}
          </nav>
          <div className="md:text-right">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={btnPrimary}><MessageCircle className="h-5 w-5" /> WhatsApp</a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-muted-foreground">© {year} Lava Car Amigão. Todos os direitos reservados.</p>
      </footer>

      <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Falar pelo WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-glow transition-transform hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
    </>
  );
}
