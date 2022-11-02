const btnStart = document.getElementById("btnStart");
const radioFriend = document.getElementById("radio-friend");
const radioBot = document.getElementById("radio-bot");
const label = document.querySelectorAll(".label-radio");
const modal = document.querySelector(".modal");
const containerDisplay = document.querySelector(".container");
const campo = document.querySelectorAll("[data-campo]");

var possiveisJogadas = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [1, 4, 8],
];


var vezJogador = true;

var selectFriend = true;

var jogador;
var numeroJogadas = 1;
label.forEach((element) => {
  if (
    (element.htmlFor == "radio-friend" && radioFriend.checked) ||
    (element.htmlFor == "radio-bot" && radioBot.checked)
  ) {
    element.style.color = "#e79898";
  } else {
    element.style.color = "white";
  }
});

radioFriend.addEventListener("click", () => {
  label.forEach((element) => {
    if (element.htmlFor == "radio-friend" && radioFriend.checked) {
      element.style.color = "#e79898";
    } else {
      element.style.color = "white";
    }
  });
});

radioBot.addEventListener("click", () => {
  label.forEach((element) => {
    if (element.htmlFor == "radio-bot" && radioBot.checked) {
      element.style.color = "#e79898";
    } else {
      element.style.color = "white";
    }
  });
});

btnStart.addEventListener("click", () => {
  if (radioBot.checked) {
    selectFriend = false;
  }
  modal.style.display = "none";
  containerDisplay.style.display = "grid";
  containerDisplay.classList.add("x");
});

document.addEventListener("click", function (e) {
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

function addJogada(id) {
  jogador = containerDisplay.classList[1];
  if (selectFriend) {
    if (
      !campo[id].classList.contains("x") &&
      !campo[id].classList.contains("o")
    ) {
      if (vezJogador) {
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
    }
  } else {
    if (
      !campo[id].classList.contains("x") &&
      !campo[id].classList.contains("o")
    ) {
      campo[id].classList.add("x");
      campo[id].innerHTML = '<i class="fa-solid fa-xmark"></i>';
      if (numeroJogadas < 5) {
        jogadaMaquina(id);
      }
      numeroJogadas = numeroJogadas + 1;
    }
  }
  if(ganhador(jogador)){
    alert('ganhador ' + jogador)
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


