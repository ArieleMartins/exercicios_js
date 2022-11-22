import { visibleModalFail, visibleModalWinner } from "./modal.js"

var theme
var containerCards
var firstCard = ''
var secondCard = ''
var numberCards
var dificult
var attempts
var numberCaptureAttempts
var timer
var main
var modal
var spanTimer

const createElement = function(tag, className){ // criando o elemento
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createCard =  function(urlImage){ // criando as cartas
    const card =  createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')

    if(theme){
        back.style.backgroundImage =`url('assets/img/rickandmorty.png')` 
    }else{
        back.style.backgroundImage =`url('assets/img/pokemon.png')`
    }
   
    front.style.backgroundImage =`url('${urlImage}')`

    card.addEventListener('click', rotateCard)
    card.appendChild(front)
    card.appendChild(back)
    
    return card
}

export function createCardAddImageCard(urls, themeMain, containerCardsMain, numberCardsMain, dificultMain, attemptsMain, timerMain, contianerMain, modalMain, spanTimerMain, numberCaptureAttemptsMain){ // criando e adicionando a url no element, e adicionando no container cards 

    theme = themeMain
    containerCards = containerCardsMain
    numberCards = numberCardsMain
    attempts = attemptsMain
    dificult = dificultMain
    timer = timerMain
    main = contianerMain
    modal = modalMain
    spanTimer = spanTimerMain
    numberCaptureAttempts = numberCaptureAttemptsMain

    urls.forEach(urlImage =>{
        const card = createCard(urlImage)
        containerCards.appendChild(card)
    })
}

const rotateCard = ({ target }) => { // pegar os dados da card ao clicar nela
    const card = target.parentNode // pegando o elemento pai

    checkNumberCard(card) 

    if(winnerGame()){
        clearInterval(timer) // parar o timer
        setTimeout(visibleModalWinner(main, modal, containerCards, spanTimer), 700) // depois de alguns milisegundo executar a funcao visiblemodalwinner
    }else if((attempts >= numberCaptureAttempts) && dificult){
        clearInterval(timer)
        setTimeout(visibleModalFail( main, modal, containerCards, spanTimer), 700)
    }     
}

function checkNumberCard(card){ // adicionando e verificando se foi seleciona duas cartas
    if(!card.classList.contains('rotate-card')){ // se o elemento possui esta classe não faça
        const checkFirstCard = firstCard == '' ? true : false // verificando se a variavel esta vazia
        const checkSecondCard = secondCard == '' ? true : false

        if(checkFirstCard){ // se estiver faça
            card.classList.add('rotate-card')
            firstCard = card
        }else if (checkSecondCard){ // senao se a segunda variavel estiver faça
            card.classList.add('rotate-card')
            secondCard = card
        }

        const checkCardsAdd = !checkFirstCard && checkSecondCard // se as duas estiverem preenchidas

        if(checkCardsAdd){ // se for verdadeiro faça
            checkCards(firstCard, secondCard)
        }
    }
}

function winnerGame(){ // verificar se o usuário conseguiu achar os pares de todas as cartas
    const cardsEquals = document.querySelectorAll('.card-equals')

   if(cardsEquals.length == (numberCards * 2)){
        return true
   }
}

function checkCards(first, second){ // verificando se as cartas selecionadas são iguais
    const childrenFirstFront = first.children[0] // pegando o primeiro filho da card
    const childrenSecondFront = second.children[0] 
    const urlImageFirstCard = window.getComputedStyle(childrenFirstFront).getPropertyValue('background-image') // pegando o valor da propriedade css background-image
    const urlImageSecondCard = window.getComputedStyle(childrenSecondFront).getPropertyValue('background-image')
    const spanAttempts = document.querySelector('.attempts')

    const checkUrls = urlImageFirstCard == urlImageSecondCard ? true : false // vericando se são iguais

    if(checkUrls){ // se for execute
        cardsEquals(first, second)
    }else{ // senao execute
        
        if(dificult){
            attempts += 1
            spanAttempts.innerHTML = `<span> Tentativas: <span class="value-attempts">${attempts}</span></span>`
        }else{
            spanAttempts.innerText = ''
        }
        setTimeout(cardsNotEquals, 500)     
    }


}

function cardsNotEquals(){ // se as cartas não forem iguais faça
    firstCard.classList.remove("rotate-card")
    secondCard.classList.remove("rotate-card")
    firstCard = ''
    secondCard = ''
}

function cardsEquals(first, second){ // se elas forem iguais faça
    first.children[0].classList.add('card-equals')
    second.children[0].classList.add('card-equals')
    firstCard = ''
    secondCard = ''
}
