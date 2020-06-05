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
  // e é eventlistener no window para
  // saber toda vez que mudar de slide
  criaNavegacao() {
    const nav = document.createElement("ul");

    this.array.forEach((item, index) => {
      nav.innerHTML += `<li><a href="#">Slide ${index + 1}</a></li>`;
    });

    this.navMenu.appendChild(nav);

    this.navArray = [...nav.children];

    this.navArray[0].classList.add("ativo");

    window.addEventListener("mudouSlide", this.slideAtivo);
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

  // alterando referências dos métodos de callback
  bindNavSlide() {
    this.slideAtivo = this.slideAtivo.bind(this);
  }
}
