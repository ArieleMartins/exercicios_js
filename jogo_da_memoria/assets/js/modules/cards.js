import { visibleModalFail, visibleModalWinner } from "./modal.js"
import { themeStyle } from "./theme.js"
import { returnNamesCharacters } from "./api.js"
import { checkAudioActive } from "./modal.js"
import { containerCards, numberCards, dificult, timer, main, modal, spanTimer } from "../script.js"

var checkAudio
var firstCard = ''
var secondCard = ''
var oldAltFirst 
var oldAltSecond
var attempts
var numberCaptureAttempts
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
    card.addEventListener('click', rotateCard)
    card.setAttribute('tabindex', '0')
    card.appendChild(front)
    card.appendChild(back)
    altNumberCard += 1

    return card
}

export function createCardAddImageCard(urls, attemptsMain, numberCaptureAttemptsMain){ // criando e adicionando a url no element, e adicionando no container cards 

    attempts = attemptsMain
    numberCaptureAttempts = numberCaptureAttemptsMain

    urls.forEach(urlImage =>{
        const card = createCard(urlImage)
        containerCards.appendChild(card)
    })
}

const rotateCard = ({ target }) => { // pegar os dados da card ao clicar nela
    var card // pegando o elemento pai
    if(target.parentNode.classList.contains('container-cards')){
        card = target
        var image = card.children[0].children[0].src
    }else{
        card = target.parentNode
        var image = card.children[0].children[0].src
    }
    

    if(!card.classList.contains('rotate-card') && !card.classList.contains('name')){ // se o elemento possui esta classe n??o fa??a
        checkNumberCard(card, image) 

        if(winnerGame()){
            clearInterval(timer) // parar o timer
            setTimeout(visibleModalWinner(main, modal, containerCards, spanTimer), 1000) // depois de alguns milisegundo executar a funcao visiblemodalwinner
            altNumberCard = 1
        }else if((attempts >= numberCaptureAttempts) && dificult){
            clearInterval(timer)
            setTimeout(visibleModalFail( main, modal, containerCards, spanTimer), 1000)
            altNumberCard = 1
        }
    }
}

function checkNumberCard(card, image){ // adicionando e verificando se foi seleciona duas cartas 
        const checkFirstCard = firstCard == '' ? true : false // verificando se a variavel esta vazia
        const checkSecondCard = secondCard == '' ? true : false
        const objectNames = returnNamesCharacters()

        if(checkFirstCard){ // se estiver fa??a
            if(!card.classList.contains('container-cards') && !card.classList.contains('imageCard')){
                card.classList.add('rotate-card')
                firstCard = card
                oldAltFirst = firstCard.children[0].children[0].alt
            }
        }else if (checkSecondCard){ // senao se a segunda variavel estiver fa??a
            if(!card.classList.contains('container-cards') && !card.classList.contains('imageCard')){
                card.classList.add('rotate-card')
                secondCard = card
                oldAltSecond = secondCard.children[0].children[0].alt
            }
        }
        
        checkAudio = checkAudioActive()
        objectNames.forEach((element) =>{
            if(element.image == image){
                    if(card.classList.contains('rotate-card')){
                        if(checkAudio){
                            setTimeout(audioNameCard(element.name), 700)
                        }
                        card.children[0].children[0].setAttribute('alt', `${element.name}`)
                    }
            }
        })

        const checkCardsAdd = !checkFirstCard && (checkSecondCard  && !secondCard.classList.contains('container-cards'))// se as duas estiverem preenchidas

        if(checkCardsAdd){ // se for verdadeiro fa??a
            checkCards(firstCard, secondCard)
        }
}

function winnerGame(){ // verificar se o usu??rio conseguiu achar os pares de todas as cartas
    const cardsEquals = document.querySelectorAll('.card-equals')

   if(cardsEquals.length == (numberCards * 2)){
        return true
   }
}

function checkCards(first, second){ // verificando se as cartas selecionadas s??o iguais
    const childrenFirstFront = first.children[0].children[0]// pegando o primeiro filho da card   
    const childrenSecondFront = second.children[0].children[0] 
    
    const urlImageFirstCard = childrenFirstFront.src
    const urlImageSecondCard = childrenSecondFront.src

/*  const urlImageFirstCard = window.getComputedStyle(childrenFirstFront).getPropertyValue('background-image') // pegando o valor da propriedade css background-image
    const urlImageSecondCard = window.getComputedStyle(childrenSecondFront).getPropertyValue('background-image') */

    const spanAttempts = document.querySelector('.attempts')

    const checkUrls = urlImageFirstCard == urlImageSecondCard ? true : false // vericando se s??o iguais

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

function cardsNotEquals(){ // se as cartas n??o forem iguais fa??a
    if(!firstCard.classList.contains('container-cards') && secondCard.classList.contains('container-cards') == false){
        firstCard.classList.remove("rotate-card")
        secondCard.classList.remove("rotate-card")
        firstCard.children[0].children[0].setAttribute('alt', `${oldAltFirst}`)
        secondCard.children[0].children[0].setAttribute('alt', `${oldAltSecond}`)
        firstCard = ''
        secondCard = ''
    }
}

function cardsEquals(first, second){ // se elas forem iguais fa??a
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