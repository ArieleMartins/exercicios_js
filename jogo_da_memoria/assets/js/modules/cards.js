import { visibleModalFail, visibleModalWinner } from "./modal.js"
import { themeStyle } from "./theme.js"
import { returnNamesCharacters } from "./api.js"
import { checkAudioActive } from "./modal.js"


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
var oldAltFirst 
var oldAltSecond

var altNumberCard = 1

const createElement = function(tag, className){ // criando o elemento
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createCard =  function(urlImage){ // criando as cartas
    const card =  createElement('div', 'card')
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back')
    const img = createElement('img', 'imageCard')
    const spanName = createElement('span', 'name')

    var theme = themeStyle()
    
    if(theme){
        back.style.backgroundImage =`url('assets/img/rickandmorty.png')` 
    }else{
        back.style.backgroundImage =`url('assets/img/pokemon.png')`
    }

    img.setAttribute('src', `${urlImage}`)
    img.setAttribute('alt', `carta ${altNumberCard}`)

    /* front.style.backgroundImage =`url('${urlImage}')` */
    front.appendChild(img)
    front.appendChild(spanName)
    card.addEventListener('click', rotateCard)
    card.setAttribute('tabindex', '0')
    card.appendChild(front)
    card.appendChild(back)
    altNumberCard += 1

    return card
}

export function createCardAddImageCard(urls, containerCardsMain, numberCardsMain, dificultMain, attemptsMain, timerMain, contianerMain, modalMain, spanTimerMain, numberCaptureAttemptsMain){ // criando e adicionando a url no element, e adicionando no container cards 
   
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
    
    var card = target.parentNode // pegando o elemento pai
    if(!card.classList.contains('card')){
        card = target
    }else{
        var image = card.children[0].children[0].src
    }

    if(!card.classList.contains('rotate-card') && !card.classList.contains('name')){ // se o elemento possui esta classe não faça
        checkNumberCard(card, image) 

        if(winnerGame()){
            clearInterval(timer) // parar o timer
            setTimeout(visibleModalWinner(main, modal, containerCards, spanTimer), 1000) // depois de alguns milisegundo executar a funcao visiblemodalwinner
        }else if((attempts >= numberCaptureAttempts) && dificult){
            clearInterval(timer)
            setTimeout(visibleModalFail( main, modal, containerCards, spanTimer), 1000)
        }
    }
}

function checkNumberCard(card, image){ // adicionando e verificando se foi seleciona duas cartas 
        const checkFirstCard = firstCard == '' ? true : false // verificando se a variavel esta vazia
        const checkSecondCard = secondCard == '' ? true : false
        const objectNames = returnNamesCharacters()

        if(checkFirstCard){ // se estiver faça
            if(!card.classList.contains('container-cards') && !card.classList.contains('imageCard')){
                card.classList.add('rotate-card')
                firstCard = card
                oldAltFirst = firstCard.children[0].children[0].alt
            }
        }else if (checkSecondCard){ // senao se a segunda variavel estiver faça
            if(!card.classList.contains('container-cards') && !card.classList.contains('imageCard')){
                card.classList.add('rotate-card')
                secondCard = card
                oldAltSecond = secondCard.children[0].children[0].alt
            }
        }
        const checkAudio = checkAudioActive()
        objectNames.map((element) =>{
            if(element.image == image){
                if(checkAudio){
                    if(card.classList.contains('rotate-card')){
                        setTimeout(audioNameCard(element.name), 700)
                    }
                }else{
                    card.children[0].children[0].setAttribute('alt', `${element.name}`)
                    card.children[0].children[1].innerText =  `${element.name}`
                }
            }
        })

        const checkCardsAdd = !checkFirstCard && (checkSecondCard  && !secondCard.classList.contains('container-cards'))// se as duas estiverem preenchidas

        if(checkCardsAdd){ // se for verdadeiro faça
            checkCards(firstCard, secondCard)
        }
}

function winnerGame(){ // verificar se o usuário conseguiu achar os pares de todas as cartas
    const cardsEquals = document.querySelectorAll('.card-equals')

   if(cardsEquals.length == (numberCards * 2)){
        return true
   }
}

function checkCards(first, second){ // verificando se as cartas selecionadas são iguais
    const childrenFirstFront = first.children[0].children[0]// pegando o primeiro filho da card   
    const childrenSecondFront = second.children[0].children[0] 
    
    const urlImageFirstCard = childrenFirstFront.src
    const urlImageSecondCard = childrenSecondFront.src

/*  const urlImageFirstCard = window.getComputedStyle(childrenFirstFront).getPropertyValue('background-image') // pegando o valor da propriedade css background-image
    const urlImageSecondCard = window.getComputedStyle(childrenSecondFront).getPropertyValue('background-image') */

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
        setTimeout(cardsNotEquals, 1500)
    }


}

function cardsNotEquals(){ // se as cartas não forem iguais faça
    if(!firstCard.classList.contains('container-cards') && secondCard.classList.contains('container-cards') == false){
        firstCard.classList.remove("rotate-card")
        secondCard.classList.remove("rotate-card")
        if(!checkAudioActive){
            firstCard.children[0].children[0].setAttribute('alt', `${oldAltFirst}`)
            secondCard.children[0].children[0].setAttribute('alt', `${oldAltSecond}`)
            firstCard.children[0].children[1].innerText =  ''
            secondCard.children[0].children[1].innerText = ''
        }
        firstCard = ''
        secondCard = ''
    }
}

function cardsEquals(first, second){ // se elas forem iguais faça
    if(!firstCard.classList.contains('container-cards') && secondCard.classList.contains('container-cards') == false){
        first.children[0].classList.add('card-equals')
        second.children[0].classList.add('card-equals')
        firstCard = ''
        secondCard = ''
    }
}

function audioNameCard(name){
    const textName = new SpeechSynthesisUtterance()
    textName.lang = 'en-us'
    textName.text = name
    window.speechSynthesis.speak(textName)
}