export default class Slide {
  constructor(anterior, proximo, slide, container) {
    this.anterior = document.querySelector(anterior);
    this.proximo = document.querySelector(proximo);
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);
  }

  // pega a posição do slide, levando
  // em conta a margem atual para que fique
  // centralizado
  posicao(item) {
    const margem = (window.innerWidth - item.offsetWidth) / 2;

    return margem - item.offsetLeft;
  }

  // cria uma lista com todos os itens
  // do slide e as posições
  listaSlide() {
    this.array = [...this.slide.children].map((item) => {
      return {
        item,
        position: this.posicao(item),
      };
    });
  }

  // atualiza posições de slide
  // anterior, atual e próximo
  // chama método para adicionar classe ativo
  posicaoSlide(index) {
    const ultimo = this.array.length - 1;
    this.index = {
      anterior: index ? index - 1 : undefined,
      atual: index,
      proximo: index === ultimo ? undefined : index + 1,
    };
    this.addClassAtivo(index);
  }

  // adiciona classe ativo no slide atual
  addClassAtivo(index) {
    this.array.forEach((element) => {
      element.item.classList.remove("ativo");
    });
    this.array[index].item.classList.add("ativo");
  }

  // movimenta para o slide anterior
  slideAnterior() {
    const anterior = this.index.anterior;

    if (anterior !== undefined) {
      const posicao = this.array[anterior].position;
      this.moverSlide(posicao, anterior);
      // ativando transição que faz a troca do slide
      this.transition(true);
    }
  }

  // movimenta para o próximo slide
  proximoSlide() {
    const proximo = this.index.proximo;

    if (proximo !== undefined) {
      const posicao = this.array[proximo].position;
      this.moverSlide(posicao, proximo);

      // ativando transição que faz a troca do slide
      this.transition(true);
    }
  }

  // move slide de acordo com a posição passada
  // atualização o index de próximo, atual e anterior
  // e atualiza as posições do slide
  moverSlide(posicao, index) {
    this.posicaoSlide(index);
    this.listaSlide();
    this.slide.style.transform = `translate3d(${posicao}px, 0, 0)`;
  }

  // alterando referência dos métodos
  // de callback dos eventos
  bind() {
    this.slideAnterior = this.slideAnterior.bind(this);
    this.proximoSlide = this.proximoSlide.bind(this);
  }

  // adiciona eventos de click nos botões
  // anterior e próximo
  addEvents() {
    this.anterior.addEventListener("click", this.slideAnterior);
    this.proximo.addEventListener("click", this.proximoSlide);
  }

  iniciar() {
    this.bind();

    this.addEvents();

    this.listaSlide();
    this.posicaoSlide(0);

    // quando inicia slide já movimenta o slide
    // pela primeira vez para que fique ao centro
    this.moverSlide(this.array[0].position, 0);

    return this;
  }
}
