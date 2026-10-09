import { useState } from "react";
import { Send } from "lucide-react";
import { bookingMessage, validateBooking, waLink, type BookingForm } from "@/lib/business";
import { SERVICES } from "./services";

const empty: BookingForm = { nome: "", telefone: "", veiculo: "", servico: "" };

export function ContactForm() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof BookingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateBooking(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(waLink(bookingMessage(form)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field = "w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
  const Err = ({ k }: { k: keyof BookingForm }) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-3xl border border-border bg-card p-6 md:p-8">
      <div>
        <label htmlFor="nome" className="mb-1 block text-sm font-medium">Nome</label>
        <input id="nome" className={field} value={form.nome} onChange={set("nome")} autoComplete="name" aria-invalid={!!errors.nome} aria-describedby="nome-err" />
        <Err k="nome" />
      </div>
      <div>
        <label htmlFor="telefone" className="mb-1 block text-sm font-medium">Telefone</label>
        <input id="telefone" type="tel" className={field} placeholder="(19) 90000-0000" value={form.telefone} onChange={set("telefone")} autoComplete="tel" aria-invalid={!!errors.telefone} aria-describedby="telefone-err" />
        <Err k="telefone" />
      </div>
      <div>
        <label htmlFor="veiculo" className="mb-1 block text-sm font-medium">Veículo</label>
        <input id="veiculo" className={field} placeholder="Ex.: Onix prata" value={form.veiculo} onChange={set("veiculo")} aria-invalid={!!errors.veiculo} aria-describedby="veiculo-err" />
        <Err k="veiculo" />
      </div>
      <div>
        <label htmlFor="servico" className="mb-1 block text-sm font-medium">Serviço desejado</label>
        <select id="servico" className={field} value={form.servico} onChange={set("servico")} aria-invalid={!!errors.servico} aria-describedby="servico-err">
          <option value="">Selecione…</option>
          {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
          <option>Outro / não sei</option>
        </select>
        <Err k="servico" />
      </div>
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">
        <Send className="h-4 w-4" /> Enviar pelo WhatsApp
      </button>
      <p className="text-center text-xs text-muted-foreground" aria-live="polite">
        {sent
          ? "Mensagem preparada no WhatsApp. Envie por lá e aguarde a confirmação da equipe."
          : "Seus dados serão enviados como mensagem no WhatsApp. O horário é confirmado pela equipe."}
      </p>
    </form>
  );
}
