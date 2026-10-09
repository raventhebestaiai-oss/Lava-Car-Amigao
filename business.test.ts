import { describe, it, expect } from "vitest";
import { validateBooking, waLink } from "@/lib/business";
describe("business", () => {
  it("wa link uses the business number", () => expect(waLink("oi")).toBe("https://wa.me/5519997057747?text=oi"));
  it("rejects invalid phone", () => expect(validateBooking({ nome: "Ana", telefone: "123", veiculo: "Gol", servico: "X" }).telefone).toBeTruthy());
  it("accepts valid form", () => expect(validateBooking({ nome: "Ana", telefone: "(19) 99705-7747", veiculo: "Gol", servico: "X" })).toEqual({}));
});
