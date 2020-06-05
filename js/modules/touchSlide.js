import Slide from "./slide.js";

export default class TouchSlide extends Slide {
  constructor(anterior, proximo, slide, container) {
    // como será mudado o constructor
    // é usado o super para dizer o que será extends
    super(anterior, proximo, slide, container);

    this.click = {
      inicial: 0,
      movido: 0,
      final: 0,
    };
  }

  clicouSlide(event) {
    if (event.type === "mousedown") {
      this.click.inicial = event.clientX;
    } else if (event.type === "touchstart") {
      this.click.inicial = event.changedTouches[0].clientX;
    }
    console.log(this.click.inicial);
  }

  finalizouClick(event) {
    if (event.type === "mouseup") {
      console.log(event.clientX);
    } else if (event.type === "touchend") {
      console.log(event.changedTouches[0].clientX);
    }
  }

  // alterando referência dos métodos
  // de callback
  // após isso é iniciado os eventos
  bindTouchSlide() {
    this.clicouSlide = this.clicouSlide.bind(this);
    this.finalizouClick = this.finalizouClick.bind(this);
  }

  // adicionando eventos iniciais
  // do slide, evento de click,
  // evento de touch,
  // evento que finaliza o click,
  // evento que finaliza o toque
  addEventsTouch() {
    this.container.addEventListener("mousedown", this.clicouSlide);
    this.container.addEventListener("touchstart", this.clicouSlide);
    this.container.addEventListener("mouseup", this.finalizouClick);
    this.container.addEventListener("touchend", this.finalizouClick);
  }

  // iniciando bind dos métodos de callback
  // e adicionando os eventos iniciais
  iniciarTouch() {
    this.bindTouchSlide();
    this.addEventsTouch();

    return this;
  }
}
