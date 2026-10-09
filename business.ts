// Dados da empresa — edite aqui para atualizar o site inteiro.
export const BUSINESS = {
  name: "Lava Car Amigão",
  address: "Centro, Louveira – SP, CEP 13290-000",
  phoneDisplay: "(19) 99705-7747",
  phoneE164: "+5519997057747",
  waNumber: "5519997057747",
  mapsQuery: "Lava Car Amigão, Centro, Louveira - SP, 13290-000",
  defaultMessage:
    "Olá! Encontrei o Lava Car Amigão pelo site e gostaria de saber mais sobre os serviços e os preços.",
};

export const HOURS = [
  { day: "Segunda a sexta", time: "07:30 – 18:00" },
  { day: "Sábado", time: "07:30 – 18:00" },
  { day: "Domingo", time: "Fechado" },
];

export const waLink = (msg: string = BUSINESS.defaultMessage) =>
  `https://wa.me/${BUSINESS.waNumber}?text=${encodeURIComponent(msg)}`;

export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapsQuery)}`;
export const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapsQuery)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapsQuery)}&output=embed`;

export const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre nós" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export type BookingForm = { nome: string; telefone: string; veiculo: string; servico: string };

export function validateBooking(f: BookingForm) {
  const e: Partial<Record<keyof BookingForm, string>> = {};
  if (f.nome.trim().length < 2) e.nome = "Informe seu nome.";
  const digits = f.telefone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 11) e.telefone = "Informe um telefone válido com DDD.";
  if (f.veiculo.trim().length < 2) e.veiculo = "Informe o veículo.";
  if (!f.servico) e.servico = "Escolha um serviço.";
  return e;
}

export function bookingMessage(f: BookingForm) {
  return `Olá! Encontrei o Lava Car Amigão pelo site e gostaria de consultar disponibilidade.\n\nNome: ${f.nome.trim()}\nTelefone: ${f.telefone.trim()}\nVeículo: ${f.veiculo.trim()}\nServiço desejado: ${f.servico}`;
}
