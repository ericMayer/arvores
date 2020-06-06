import NavSlide from "./modules/navSlide.js";

const slide = new NavSlide(
  '[data-slide="anterior"]',
  '[data-slide="proximo"]',
  '[data-slide="imagens"]',
  '[data-slide="grid"]',
  '[data-slide="nav"]'
);

slide.iniciar();
slide.criaNavegacao();
