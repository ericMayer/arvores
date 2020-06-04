export default class Slide {
  constructor(slide, container) {
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);

    // será armazenado a posição
    // inicial do click
    // o movimento realizado
    // e a posição final
    this.posicao = {
      inicial: 0,
      movimento: 0,
      final: 0,
    };
  }

  // quando for clicado com o mouse
  click(event) {
    // prevenindo padrão
    // para não ser possível arrastar a imagem do mouse
    event.preventDefault();

    // quando é realizado o primeiro click é armazenado
    // a posição inicial
    this.posicao.inicial = event.clientX;

    // adicionando que está movendo o mouse
    this.container.addEventListener("mousemove", this.move);
  }

  // método de quando está sendo movido o mouse após clicado
  move(event) {
    // chamado método que atualiza
    // o movimento e armazenando
    // em uma variável
    const posicao = this.atualizaPosicao(event.clientX);

    // chamando método que irá mover o slide
    this.moveSlide(posicao);
  }

  // método de quando é parado o clique do mouse
  up() {
    // removendo o evento de mousemove,
    // pois já foi parado a movimentação do mouse
    this.container.removeEventListener("mousemove", this.move);

    // adiciando a posição final quando for finalizado
    this.posicao.final = this.posicao.anterior;
  }

  // atualizando a posição do movimento
  // em relação a posição inicial
  // é retornado o movimento por final
  atualizaPosicao(clientX) {
    // subtraindo o movimento realizado
    // da posição inicial, pois assim
    // o valor fica negativo o slide
    // se movimenta no sentido correto,
    // caso fosse ao contrário o movimento do slide
    // ficaria contrário ao natural
    // multiplicando para ser mais rápido a movimentação
    this.posicao.movimento = (this.posicao.inicial - clientX) * 1.4;

    // pegando a posição final e diminuindo da posição do movimento
    // para sempre que recomeçar o movimento,
    // começar a partir da posição que foi
    // foi finalizada o movimento
    return this.posicao.final - this.posicao.movimento;
  }

  // método responsável
  // por mover o slide
  moveSlide(movimento) {
    // movimentando o slide
    this.slide.style.transform = `translate3d(${movimento}px, 0, 0)`;

    // armazenando última posição
    this.posicao.anterior = movimento;
  }

  // adiciona eventos iniciais
  addEvent() {
    // adicionado evento quando é clicado com o mouse
    this.container.addEventListener("mousedown", this.click);

    // adicionado evento que verifica
    // se foi parado o clique
    this.container.addEventListener("mouseup", this.up);
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
