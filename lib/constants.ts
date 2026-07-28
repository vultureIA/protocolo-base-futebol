export const CHECKOUT_URL = "https://sun.eduzz.com/69K1B1K3WO";
export const INSTAGRAM_PROOF_URL = "https://www.instagram.com/p/Da3nmaDCf-2/";
export const INSTAGRAM_BERO_URL = "https://www.instagram.com/beroparaiba/";
export const PRICE = "59,90";
export const PRICE_NUMBER = 59.9;
export const GUARANTEE_DAYS = 7;
export const PRODUCT_NAME = "protocolo-base-futebol";

/** Variante do teste A/B — enviada como parâmetro custom nos eventos do Pixel. */
export const AB_VARIANT = "b";

/** Identifica a posição do CTA nos eventos InitiateCheckout do Pixel. */
export type CtaId =
  | "header"
  | "hero"
  | "prova"
  | "preco"
  | "garantia"
  | "final"
  | "mobile_bar";
