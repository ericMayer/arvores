import Slide from "./slide.js";

export default class NavSlide extends Slide {
  constructor(anterior, proximo, slide, container, navMenu) {
    // como será mudado o constructor
    // é usado o super para dizer o que será extends
    super(anterior, proximo, slide, container);

    // selecionando o elemento onde será
    // adicionado o menu de navegação de bolinhas
    this.navMenu = document.querySelector(navMenu);

    // alterando referência dos métodos
    // que serão usados como callback
    // nos eventos
    this.bindNavSlide();
  }

  // criando a navegação por bolinhas
  // é adicionado um texto dentro,
  // pois caso usado leitor de telas irá aparecer
  // alguma informação
  // a navegação é adicionada como filha do elemento
  // passado no constructor
  // é iniciado o primeiro item da array como ativo
  // para ficar diferenciado dos outros itens
  // é chamado método que inicia os eventos
  criaNavegacao() {
    const nav = document.createElement("ul");

    this.array.forEach((item, index) => {
      nav.innerHTML += `<li><a href="#">Slide ${index + 1}</a></li>`;
    });

    this.navMenu.appendChild(nav);

    this.navArray = [...nav.children];

    this.navArray[0].classList.add("ativo");

    this.navSlideEvents();
  }

  // remove a classe ativo
  // de todas bolinhas de navegação
  // e adiciona somente no item atual do slide
  slideAtivo() {
    this.navArray.forEach((item) => {
      item.classList.remove("ativo");
    });

    this.navArray[this.index.atual].classList.add("ativo");
  }

  // faz um foreach em todos os itens do menu
  // de navegação por bolinhas, daí
  // é comparado se o item é igual ao event.path[1]
  // que é a bolinha clicada, com isso
  // é pego a posição do array que deseja movimentar
  // e é ativado a função que movimenta
  // o slide passando a posição e o index
  mudaBolinha(event) {
    // irá prevenir no mobile de ocorrer,
    // os dois eventos click e touchstart
    // ocorrendo apenas um, mesmo se não tiver
    // o evento de touchstart ele ocorre automaticamente
    // no navegador
    event.preventDefault();
    this.navArray.forEach((item, index) => {
      if (item === event.path[1]) {
        const posicao = this.array[index].position;
        this.moverSlide(posicao, index);
      }
    });
  }

  // alterando referências dos métodos de callback
  bindNavSlide() {
    this.slideAtivo = this.slideAtivo.bind(this);
    this.mudaBolinha = this.mudaBolinha.bind(this);
  }

  // adiciona eventos para verificar se mudou slide
  // ou se foi clicado em alguma bolinha
  // do menu de navegação dos slides
  navSlideEvents() {
    window.addEventListener("mudouSlide", this.slideAtivo);

    this.navArray.forEach((item) => {
      item.addEventListener("click", this.mudaBolinha);
      item.addEventListener("touchstart", this.mudaBolinha);
    });
  }
}
