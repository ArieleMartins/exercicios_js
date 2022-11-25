import { acessUrl as api } from "./modules/api.js"
import { visibilityModalError } from "./modules/modal.js"
import { startTimer } from "./modules/timer.js"
import { checkTheme, themeStyle } from "./modules/theme.js"
import { createCardAddImageCard } from "./modules/cards.js"

const containerCards = document.querySelector(".container-cards")
const modal = document.querySelector('.container')
const play = document.getElementById("play")
const spanTimer = document.querySelector('.timer')
const main = document.querySelector('.container-main')
const menuNormal = document.getElementById('normal')
const menuCustomize = document.getElementById('customize')
const numberAttemps = document.getElementById('number-attempts')
const inputRange = document.getElementById('range-cards')
const containerCustomize = document.querySelector('.container-customize')

var theme = true
var urlImages = []

var attempts = 0
var cards = 9
var dificult
var numberCards
var numberCaptureAttempts = 25
var timerValueMinuts = 0
var checkFloatRangeTimer = false
var checkRangeTimer = false 
var timer 

function shiffledUrlsCapture(){ // enbaralhando as urls e pegando somente seis delas
    var urlsShiffledSix = []
    const shiffledUrls = urlImages.sort(() => Math.random() - 0.5)
    
    if(dificult){
        numberCards = cards 
    }else{
        numberCards = 9
    }

    for (var index = 0; index < numberCards; index++){
        urlsShiffledSix.push(shiffledUrls[index])
    }

    return urlsShiffledSix
}

function loadGame(){ // iniciando o jogo
    const urls = shiffledUrlsCapture() // pegando as urls embaralhadas
    const duplicateUrls = [ ... urls, ... urls] // duplicando-as

    const shiffledUrls = duplicateUrls.sort(() => Math.random() - 0.5) // embaralhando novamente
   
    createCardAddImageCard(shiffledUrls, containerCards, numberCards, dificult, attempts, timer, main, modal, spanTimer, numberCaptureAttempts)
}

play.addEventListener('click', async function (){ // quando o usuário aperta play
    if(Number(numberAttemps.value) > Number(inputRange.value * 2)){
        visibilityModalError()
    }else{
        checkFloatRangeTimer = false
        checkRangeTimer = false
        attempts = 0
        urlImages = [] // zerar as urls
        modal.style.visibility = 'hidden' // esconder o modal
        main.style.visibility = 'visible' // deixar o contianer principal visivel
        spanTimer.innerText = '0:00' // zerar o timer
        timerValueMinuts = 0

        const checkClassMenu = menuNormal.classList.contains('active')

        if(checkClassMenu){
            dificult = false
        }

        if(dificult){
            numberCaptureAttempts = Number(numberAttemps.value)
            cards = Number(inputRange.value)
        }

        visibilityCustomize('normal')
        const url = await checkTheme()
        theme = themeStyle()
        await api(url, urlImages, theme)
        timer = await startTimer(main, modal, containerCards, checkFloatRangeTimer, checkRangeTimer, timerValueMinuts, spanTimer, dificult )
        await loadGame()
        
    }
})

// menu

menuNormal.addEventListener('click', () =>{
    visibilityCustomize('normal')
    menuCustomize.setAttribute('aria-label', 'opção de seleção - Dificuldade Personalizada - enter para selecionar ')
    menuNormal.setAttribute('aria-label', 'opção de seleção - Dificuldade Normal - selecionado ')
    numberAttemps.value = '10'
    dificult = false
    
})

menuCustomize.addEventListener('click', () =>{
    visibilityCustomize('customize')
    menuNormal.setAttribute('aria-label', 'opção de seleção - Dificuldade Normal - enter para selecionar')
    menuCustomize.setAttribute('aria-label', 'opção de seleção - Dificuldade Personalizada - selecionado')
    numberAttemps.value = '10'
    inputRange.value = '9'
    dificult = true

})

inputRange.addEventListener("input", () =>{
    const spanNumberCards = document.querySelector(".cards")
    spanNumberCards.innerText = inputRange.value * 2
})

function visibilityCustomize(menuDificult){
    if(menuDificult == 'normal'){
        menuNormal.classList.add('active')
        menuCustomize.classList.remove("active")
        containerCustomize.classList.remove('customize')
        containerCustomize.classList.add('normal')
        containerCustomize.style.visibility = 'hidden'
    }else{
        menuCustomize.classList.add('active')
        menuNormal.classList.remove("active")
        containerCustomize.classList.add('customize')
        containerCustomize.classList.remove('normal')
        containerCustomize.style.visibility = 'visible'
    }
}


window.addEventListener("keyup", (event) =>{
    const checkVisibilityModal = window.getComputedStyle(modal).getPropertyValue('visibility') == 'visible' ? true : false
    const checkVisibilityCustomize = window.getComputedStyle(containerCustomize).getPropertyValue('visibility') == 'visible' ? true : false
    const checkTimerBox = checkVisibilityCustomize && event.target.classList.contains("number-timer")

    if(checkVisibilityModal){
        switch(event.target.id){
            case 'normal':
                clickEvent(event.key, menuNormal)
                break
            case 'customize':
                clickEvent(event.key, menuCustomize)
                break
        }
        if(checkTimerBox){
            clickEvent(event.key, event.target)
        }
    } 
})

window.addEventListener("keydown", (event) =>{
    const checkVisibilityMain = window.getComputedStyle(main).getPropertyValue('visibility') == 'visible' ? true : false

    if(event.key == "ArrowRight"){
        if(event.target.nextElementSibling != undefined){
            event.target.nextElementSibling.focus()
        }
    }else if(event.key == 'ArrowLeft'){
        if(event.target.previousElementSibling != undefined){
            event.target.previousElementSibling.focus()
        }
    }

    if(checkVisibilityMain){
        clickEvent(event.key, event.target)
    }
})

function clickEvent(key, element){
    if(key == 'Enter'){
        element.click()
    }
}
