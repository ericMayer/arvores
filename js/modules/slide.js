import debounce from "./debounce.js";

export default class Slide {
  constructor(anterior, proximo, slide, container) {
    this.anterior = document.querySelector(anterior);
    this.proximo = document.querySelector(proximo);
    this.slide = document.querySelector(slide);
    this.container = document.querySelector(container);

    // evento que irá ocorrer toda vez que ocorrer
    // uma mudança de slide
    this.mudouSlide = new Event("mudouSlide");

    this.click = {
      inicial: 0,
      movido: 0,
      final: 0,
    };
  }

  // pega a posição do slide, levando
  // em conta a margem atual para que fique
  // centralizado
  // pegado o tamanho total do windows diminuido
  // pelo tamanho do slide e dividido por dois
  // para ficar centralizado
  // depois subtraído da distância da esquerda do item
  // a esquerda da página
  // e deixado como negativo, para ficar
  // no sentido correto o slide
  posicao(item) {
    // const margem = (window.innerWidth - item.offsetWidth) / 2;

    const margem = (this.container.offsetWidth - item.offsetWidth) / 2;

    return -(item.offsetLeft - margem);
  }

  // cria uma lista com todos os itens
  // do slide e as posições
  listaSlide() {
    this.array = [...this.slide.children].map((item) => {
      return {
        item: item,
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

  // método que adiciona
  // a transição do slide no item atual
  // e remove de todos os outros
  transicao() {
    this.array.forEach((element) => {
      element.item.style.transition = "";
    });

    this.array[this.index.atual].item.style.transition = ".3s";
  }

  // movimenta para o slide anterior
  slideAnterior() {
    const anterior = this.index.anterior;

    if (anterior !== undefined) {
      const posicao = this.array[anterior].position;
      this.moverSlide(posicao, anterior);
    }
  }

  // movimenta para o próximo slide
  proximoSlide() {
    const proximo = this.index.proximo;

    if (proximo !== undefined) {
      const posicao = this.array[proximo].position;
      this.moverSlide(posicao, proximo);
    }
  }

  // move slide de acordo com a posição passada
  // atualização o index de próximo, atual e anterior
  // e atualiza as posições do slide
  // também é disparado o evento
  // que indica que trocou de slide
  moverSlide(posicao, index) {
    // método que cria animação na troca de slides
    this.transicao();

    this.posicaoSlide(index);
    this.listaSlide();
    this.slide.style.transform = `translate3d(${posicao}px, 0, 0)`;
    window.dispatchEvent(this.mudouSlide);
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

  // evento que quando é clicado com o mouse
  // ou com o touch
  // é adicionado os eventos de mousemove
  // e touchmove, também é pego a posição inicial
  // onde foi clicado
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

  // pega a posição que está sendo movida
  // é chama o método responsável por fazer o cálculo
  // do quanto deve ser movido,
  // após isso é chamado o método
  // responsável por mudar o slide na tela
  movendoSlide(event) {
    let clientX = 0;
    if (event.type === "mousemove") {
      clientX = event.clientX;
    } else if (event.type === "touchmove") {
      clientX = event.changedTouches[0].clientX;
    }

    const posicao = this.calculaMovimento(clientX);
    if (this.click.inicial !== clientX) {
      this.arrastandoSlide(posicao);
    }
  }

  // após ser finalizado o evento de click
  // ou touch e removido o evento
  // e salvo o click final
  // também é chamado o método que irá
  // verificar qual troca de slide será
  // necessária fazer
  finalizouClick(event) {
    if (event.type === "mouseup") {
      this.click.final = event.clientX;
      this.container.removeEventListener("mousemove", this.movendoSlide);
    } else if (event.type === "touchend") {
      this.click.final = event.changedTouches[0].clientX;
      this.container.removeEventListener("touchmove", this.movendoSlide);
    }
    this.click.final = this.click.salvo;

    this.trocandoSlide();
  }

  // fazendo o cálculo da movimentação do slide
  // o método está incorreto, por isso é necessário correção
  calculaMovimento(clientX) {
    this.click.movido = (this.click.inicial - clientX) * 1.4;

    return this.click.final - this.click.movido;
  }

  // atualiza o slide de acordo com
  // o que foi movido
  arrastandoSlide(posicao) {
    this.click.salvo = posicao;
    this.slide.style.transform = `translate3d(${posicao}px, 0, 0)`;
  }

  // verificado o tamanho do movimento
  // que foi realizado, caso seja significativo
  // é mandado para o próximo slide ou para o anterior,
  // caso não tiver sido feita uma movimentação
  // significativa, será mantido o slide atual
  trocandoSlide() {
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

  // toda vez que ocorrer o resize
  // será atualizado a lista slide
  // com as posições dos elementos
  // após isso, será movido o slide
  // usando o index e a posição atual
  resize() {
    setTimeout(() => {
      this.listaSlide();
      const posicao = this.array[this.index.atual].position;
      const index = this.index.atual;
      this.moverSlide(posicao, index);
    }, 1000);
  }

  // alterando referência dos métodos
  // de callback
  // após isso é iniciado os eventos
  bindTouchSlide() {
    this.clicouSlide = this.clicouSlide.bind(this);
    this.finalizouClick = this.finalizouClick.bind(this);
    this.movendoSlide = this.movendoSlide.bind(this);

    // chamando a função de debounce para não repetir
    // o mesmo evento milhares de vezes
    this.resize = debounce(this.resize.bind(this), 200);
  }

  // adicionando eventos iniciais
  // do slide, evento de click,
  // evento de touch,
  // evento que finaliza o click,
  // evento que finaliza o toque
  // evento de resize
  addEventsTouch() {
    this.container.addEventListener("mousedown", this.clicouSlide);
    this.container.addEventListener("mouseup", this.finalizouClick);
    this.container.addEventListener("touchstart", this.clicouSlide);
    this.container.addEventListener("touchend", this.finalizouClick);

    window.addEventListener("resize", this.resize);
  }

  // iniciando bind dos métodos de callback
  // e adicionando os eventos iniciais
  // também é iniciado métodos iniciais
  iniciar() {
    this.bind();
    this.addEvents();
    this.bindTouchSlide();
    this.addEventsTouch();

    // pegando a lista de slides
    // com imagem e posição
    // também é pego os índices do slide
    // anterior, atual e próximo, iniciado em 0
    this.listaSlide();
    this.posicaoSlide(0);

    // quando inicia slide já movimenta o slide
    // pela primeira vez para que fique ao centro
    this.moverSlide(this.array[0].position, 0);

    return this;
  }
}
