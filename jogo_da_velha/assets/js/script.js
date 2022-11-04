const btnStart = document.getElementById("btnStart");
const radioFriend = document.getElementById("radio-friend");
const radioBot = document.getElementById("radio-bot");
const label = document.querySelectorAll(".label-radio"); // para alterar a cor ao selecionar radio
const modal = document.querySelector(".modal"); 
const containerDisplay = document.querySelector(".container"); // container do tabuleiro
const campo = document.querySelectorAll("[data-campo]"); // campos do tabuleiro
const displayWinner = document.querySelector('.ganhador') // container onde será exibido o ganhador

var possiveisJogadas = [ 
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
]; // verificar as possivel jogadas para ganhar

var ganhadorMaquina = false; // para saber se o bot ganhou

var vezJogador = true; // para mudar o jogador

var selectFriend = true; // verificando se o radio amigo foi selecionado, já comeca como ativo, pois o radio já inicia checked

var jogador; // onde ficará armazenado o jogador para exibir que ganhou

var numeroJogadasBot = 1; // controlar as jogadas do bot

var numeroJogadas = 1; // verificar empate se for tipo friend

label.forEach((element) => { // trocando a cor das label assim que iniciado
  if (
    (element.htmlFor == "radio-friend" && radioFriend.checked) ||
    (element.htmlFor == "radio-bot" && radioBot.checked)
  ) {
    element.style.color = "#e79898";
  } else {
    element.style.color = "white";
  }
});

radioFriend.addEventListener("click", () => { // trocar a cor da label ao clicar no radio friend
  label.forEach((element) => {
    if (element.htmlFor == "radio-friend" && radioFriend.checked) {
      element.style.color = "#e79898";
    } else {
      element.style.color = "white";
    }
  });
});

radioBot.addEventListener("click", () => { // trocar a cor da label ao clicar no radio bot
  label.forEach((element) => {
    if (element.htmlFor == "radio-bot" && radioBot.checked) {
      element.style.color = "#e79898";
    } else {
      element.style.color = "white";
    }
  });
});

btnStart.addEventListener("click", () => { // iniciar o jogo
  if (radioBot.checked) {
    selectFriend = false;
  }else{
    selectFriend = true
  }
  modal.style.display = "none";
  containerDisplay.style.display = "grid";
  containerDisplay.classList.add("x");
  containerDisplay.classList.remove('o')
  vezJogador = true
  numeroJogadasBot = 1
  numeroJogadas = 1
  campo.forEach(element =>{
    element.classList.remove('x')
    element.classList.remove('o')
    element.innerHTML = ''
  })
  ganhadorMaquina = false

});

document.addEventListener("click", function (e) { // pegando os id dos campos após clicar neles
  switch (e.target.id) {
    case "0":
      addJogada(e.target.id);
      break;
    case "1":
      addJogada(e.target.id);
      break;
    case "2":
      addJogada(e.target.id);
      break;
    case "3":
      addJogada(e.target.id);
      break;
    case "4":
      addJogada(e.target.id);
      break;
    case "5":
      addJogada(e.target.id);
      break;
    case "6":
      addJogada(e.target.id);
      break;
    case "7":
      addJogada(e.target.id);
      break;
    case "8":
      addJogada(e.target.id);
      break;
  }
});

function addJogada(id) { // aqui onde será adicionada a jogada do jogador e feitas as verificações necessarias
  jogador = containerDisplay.classList[1]; // pegando o jogador pela classe adicionado no container display
  
  if (selectFriend) { // verificando se o jogador escolheu jogar com o amigo se sim faça
    if ( 
      !campo[id].classList.contains("x") &&
      !campo[id].classList.contains("o")
    ) { // verificando se o campo pois as classes x e o se sim não faça
      if (vezJogador) { // se for verdadeiro é a vez do jogador x
        containerDisplay.classList.add("o");
        containerDisplay.classList.remove("x");
        campo[id].classList.add("x");
        campo[id].innerHTML = '<i class="fa-solid fa-xmark"></i>';
      } else { 
        containerDisplay.classList.add("x");
        containerDisplay.classList.remove("o");
        campo[id].classList.add("o");
        campo[id].innerHTML = '<i class="fa-solid fa-o"></i>';
      }
      vezJogador = !vezJogador;
      numeroJogadas = numeroJogadas + 1;
    }
  } else { // se o jogador selecionar para jogar com o bot
    if (
      !campo[id].classList.contains("x") &&
      !campo[id].classList.contains("o")
    ) {
      campo[id].classList.add("x");
     
      campo[id].innerHTML = '<i class="fa-solid fa-xmark"></i>';

      if (numeroJogadasBot < 5) { // controlar as jogadas da maquina
        jogadaMaquina(id);
        ganhadorMaquina = ganhador('o') // verificar se a maquina ganhou
      }
     
      numeroJogadasBot = numeroJogadasBot + 1;
    }
  }
 
  if(ganhador(jogador)){
    restartGame('Ganhador: ' + jogador)
  }else if(ganhadorMaquina){
    restartGame('Ganhador: O')
  }else if(numeroJogadasBot > 5){ // apenas verifica o empate se foi bot
    restartGame('Empate')
  }else if(numeroJogadas > 9){ // apenas verifica o empate se foi friend
    restartGame('Empate')
  }
}

function ganhador(jogador) {
  return possiveisJogadas.some((combinacao) => {
    return combinacao.every((index) => {
      return campo[index].classList.contains(jogador);
    });
  });
}


function jogadaMaquina(id) {
  var maquina = Math.floor(Math.random() * 9);
  while (
    campo[maquina].classList.contains("x") ||
    campo[maquina].classList.contains("o")
  ) {
    maquina = Math.floor(Math.random() * 9);
  }
  if (
    campo[maquina].classList.contains("x") === false ||
    campo[maquina].classList.contains("o") === false
  ) {
    campo[maquina].classList.add("o");
    campo[maquina].innerHTML = '<i class="fa-solid fa-o"></i>';
  }
}

function restartGame(ganhador){ // funcao para mostrar o ganhador e reiniciar o jogo
    modal.style.display = 'flex'
    containerDisplay.style.display = "none";
    displayWinner.innerHTML = `<h2 style="text-transform: uppercase">${ganhador}</h2>`
    btnStart.innerText = 'RESTART'
}

