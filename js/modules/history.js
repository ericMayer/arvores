import NavSlide from "./navSlide.js";
import Tooltip from "./tooltip.js";

export default function history(links, conteudo) {
  // todos os links da página são passados
  // é mais a div com o conteúdo geral que será substituído
  links = document.querySelectorAll(links);
  conteudo = conteudo;

  // cria uma nova div
  // e adiciona o texto da página clicada
  // no html da nova div
  // seleciona o contéudo antigo
  // troca o html do conteúdo antigo pelo novo
  // altera o title do página
  // é inicia as classes
  // para as não travar as outras funcionalidades
  // do site
  const trocaConteudo = (texto) => {
    const conteudoNovo = document.createElement("div");
    conteudoNovo.innerHTML = texto;

    const conteudoAntigo = document.querySelector(conteudo);

    conteudoAntigo.innerHTML = conteudoNovo.querySelector(conteudo).innerHTML;

    document.title = conteudoNovo.querySelector("title").innerText;

    iniciarClasses();
  };

  // realizando o fetch na url clicada
  // é transformado o conteúdo da resposta
  // recebida em texto
  // chama o método que faz a troca do texto
  // alterado a url que fica no navegador para
  // a correta
  async function fetchPage(url) {
    const texto = await (await fetch(url)).text();

    window.history.pushState(null, null, url);

    trocaConteudo(texto);
  }

  // pegando a url do link clicado
  // é chamando método que faz o fetch
  // na url
  const clickUrl = (event) => {
    event.preventDefault();
    fetchPage(event.path[1].href);
  };

  // iniciando classes do slide
  // e tooltip para atualizar os dados
  // é continuarem funcionando
  const iniciarClasses = () => {
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
  };

  // adicionado evento de popstate
  // que será quando for clicado no voltar ou avançar
  // é chamado o método assíncrono que faz
  // o fetch na página de acordo com a url passada
  // também é adicionado os eventos de click
  // e touchstart em todos links da página
  window.addEventListener("popstate", () => {
    fetchPage(window.location.href);
  });

  links.forEach((link) => {
    link.addEventListener("click", clickUrl);
    link.addEventListener("touchstart", clickUrl);
  });
}
