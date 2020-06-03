export default class Slide {
  constructor(slide) {
    this.slide = document.querySelector(slide);
  }

  // quando for clicado com o mouse
  click(event) {
    // prevenindo padrão
    // para não ser possível arrastar a imagem do mouse
    event.preventDefault();

    this.slide.addEventListener("mousemove", this.move);
  }

  // método de quando está sendo movido o mouse após clicado
  move(event) {
    // adicionado evento que verifica
    // se foi parado o clique
    this.slide.addEventListener("mouseup", this.up);
  }

  // método de quando é parado o clique do mouse
  up() {
    // removendo o evento de mousemove,
    // pois já foi parado a movimentação do mouse
    this.slide.removeEventListener("mousemove", this.move);

    // removendo evento de mouseup, pois
    // só será usado quando foi feito a movimentação
    this.slide.removeEventListener("mouseup", this.up);
  }

  // adiciona eventos iniciais
  addEvent() {
    // adicionado evento quando é clicado com o mouse
    this.slide.addEventListener("mousedown", this.click);
  }

  // alterando referências dos eventos
  // de callback para a referência da classe
  bindEvents() {
    this.click = this.click.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
  }

  // inicia eventos iniciais
  // e retorna o this para caso
  // quiser encadear métodos
  iniciar() {
    this.bindEvents();
    this.addEvent();
    return this;
  }
}
