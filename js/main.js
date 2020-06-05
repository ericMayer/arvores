import NavSlide from "./modules/navSlide.js";
import TouchSlide from "./modules/touchSlide.js";

const slide = new NavSlide(
  '[data-slide="anterior"]',
  '[data-slide="proximo"]',
  '[data-slide="imagens"]',
  '[data-slide="grid"]',
  '[data-slide="nav"]'
);

slide.iniciar();
slide.criaNavegacao();

const touchSlide = new TouchSlide(
  '[data-slide="anterior"]',
  '[data-slide="proximo"]',
  '[data-slide="imagens"]',
  '[data-slide="grid"]'
);
touchSlide.iniciarTouch();
