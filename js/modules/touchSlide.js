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
    event.preventDefault();
    if (event.type === "mousedown") {
      this.click.inicial = event.clientX;
      this.container.addEventListener("mousemove", this.movendoSlide);
    } else if (event.type === "touchstart") {
      this.click.inicial = event.changedTouches[0].clientX;
      this.container.addEventListener("touchmove", this.movendoSlide);
    }
  }

  calculaMovimento(clientX) {
    const item = this.array[this.index.atual].item;
    const margem = (window.innerWidth - item.offsetWidth) / 2;

    return clientX - margem;
  }

  movendoSlide(event) {
    const clientX =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;

    const posicao = this.calculaMovimento(clientX);

    this.arrastandoSlide(posicao);
  }

  arrastandoSlide(posicao) {
    this.slide.style.transform = `translate3d(${posicao}px, 0, 0)`;
  }

  finalizouClick(event) {
    if (event.type === "mouseup") {
      this.click.final = event.clientX;
      this.container.removeEventListener("mousemove", this.movendoSlide);
    } else if (event.type === "touchend") {
      this.click.final = event.changedTouches[0].clientX;
      this.container.removeEventListener("touchmove", this.movendoSlide);
    }

    this.click.movido = this.click.inicial - this.click.final;
    this.trocandoSlide();
  }

  trocandoSlide() {
    console.log(this.click.movido);
    if (this.click.movido > 120 && this.index.proximo !== undefined) {
      this.proximoSlide();
    } else if (this.click.movido < -120 && this.index.anterior !== undefined) {
      this.slideAnterior();
    } else {
      const posicao = this.array[this.index.atual].position;
      const index = this.index.atual;
      this.moverSlide(posicao, index);
    }
  }

  // alterando referência dos métodos
  // de callback
  // após isso é iniciado os eventos
  bindTouchSlide() {
    this.clicouSlide = this.clicouSlide.bind(this);
    this.finalizouClick = this.finalizouClick.bind(this);
    this.movendoSlide = this.movendoSlide.bind(this);
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
