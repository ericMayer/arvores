export default class Tooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);
  }

  // criando todas as tooltips
  // é adicionando elas no body
  // é usado o map pois irá verificar
  // em qual tooltip o evento de mouseover
  // passar por cima, foi acionada
  // após fazer a verificação de qual item for
  // será feito um filtro na array
  // é só será mantido os itens
  // que não forem undefined, no caso
  // o item que teve o mouse passado por cima
  criaTooltip(event) {
    this.tooltip = [...this.tooltips]
      .map((item) => {
        if (event.target.ariaLabel === item.getAttribute("aria-label")) {
          const divTooltip = document.createElement("div");
          divTooltip.classList.add("tooltip");

          const p = document.createElement("p");

          p.innerText = item.getAttribute("aria-label");

          divTooltip.appendChild(p);

          document.body.appendChild(divTooltip);
          return divTooltip;
        }
      })
      .filter((item) => {
        return item !== undefined;
      });
  }

  // quando passado mouse por cima
  // será criado a tooltip
  // e adicionado os eventos
  // de mousemove e mouseleave
  mouseOver(event) {
    this.criaTooltip(event);

    this.tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mousemove", this.mouseMove);
      tooltip.addEventListener("mouseleave", this.mouseLeave);
    });
  }

  // quando for mexido o mouse por cima
  // a tooltip irá se mover de acordo
  // será alterado o top (y) e o left (x)
  // se a tela estiver estourando será
  // diminuido 220px para trocar a direção
  // da tooltip e deixar os 20px de separação
  // do mouse da tooltip
  mouseMove(event) {
    this.tooltip[0].style.top = `${event.pageY + 20}px`;

    if (event.pageX + 200 > window.innerWidth) {
      this.tooltip[0].style.left = `${event.pageX - 220}px`;
    } else {
      this.tooltip[0].style.left = `${event.pageX + 20}px`;
    }
  }

  // quando tirado o mouse será removido
  // a tooltip, é usado apenas a primeira posição
  // da lista, porquê só irá ter uma tooltip ativa
  // na tela por vez
  // também está sendo removido os eventos da tooltip
  mouseLeave() {
    this.tooltip[0].remove();
    this.tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mousemove", this.mouseMove);
    });
  }

  // alterando referência dos
  // métodos de callback
  bind() {
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  // adicionando evento inicial
  // de mouseover (passar mouse por cima)
  addEvents() {
    this.tooltips.forEach((tooltip) => {
      tooltip.addEventListener("mouseover", this.mouseOver);
    });
  }

  // iniciando eventos e bind,
  // retornando referência da classe
  iniciar() {
    this.bind();
    this.addEvents();

    return this;
  }
}
