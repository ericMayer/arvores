import Slide from "./modules/slide.js";

const slide = new Slide(
  '[data-slide="anterior"]',
  '[data-slide="proximo"]',
  '[data-slide="imagens"]',
  '[data-slide="grid"]'
);

slide.iniciar();
