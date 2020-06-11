export default function debounce(callback, delay) {
  // método de debounce onde desestrutura os argumentos
  // em um array e depois passa ele na função de callback como rest
  // para caso quiser passar algo
  // a função de debounce funciona da seguinte forma
  // toda vez que o timer existir ou seja for setTimeout
  // irá limpar o timeout, após isso será criado
  // um timeout onde irá executar a função de callback
  // e definirá o timer como null
  // ficará fazendo isso no intervalo definido
  // sendo assim irá diminuir a quantidade de vezez,
  // por exemplo que o scroll é feito
  // como o evento scroll chama várias vezes
  // a função quando ciar de novo na verificação timer
  // já irá existir é devido a isso irá limpar o timeout
  // isso irá evitar de fazer várias vezes
  // o mesmo evento de scroll

  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}
