import NavSlide from "./modules/navSlide.js";
import Tooltip from "./modules/tooltip.js";
import history from "./modules/history.js";

const slide = new NavSlide(
  '[data-slide="anterior"]',
  '[data-slide="proximo"]',
  '[data-slide="imagens"]',
  '[data-slide="grid"]',
  '[data-slide="nav"]'
);

slide.iniciar();
slide.criaNavegacao();

const tooltip = new Tooltip('[data-tooltip="informacao"]');
tooltip.iniciar();

history('[data-menu="links"] a', "[data-conteudo]");
