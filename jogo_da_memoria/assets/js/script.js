const containerCards = document.querySelector(".container-cards")
const play = document.getElementById("play")
const modal = document.querySelector('.container')
const main = document.querySelector('.container-main')
const spanTimer = document.querySelector('.timer')

var url = ''
var theme = true
var firstCard = ''
var secondCard = ''
var urlImages = []

var timerValueSeconds = 0
var timerValueMinuts = 0
var timer 

async function acessUrl(){
    try{
        const response = await fetch(url)
        const dataJson = await response.json()

        if(theme){
            for (const data of dataJson.results){
                urlImages.push(data.image)
            }
        }else{
            for (const data of dataJson.results){
                await acessUrlPokemon(data.url)
            }      
        }
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }

    return urlImages
   
}

async function acessUrlPokemon(url){
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        urlImages.push(dataJson.sprites.front_default)
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
}


const createElement = function(tag, className){
    const element = document.createElement(tag)
    element.className = className
    return element
}

const createCard =  function(urlImage){
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



function shiffledUrlsCapture(){
    var urlsShiffledSix = []
    
    const shiffledUrls = urlImages.sort(() => Math.floor(Math.random() * 5))

    for (var index = 0; index < 9; index++){
        urlsShiffledSix.push(shiffledUrls[index])
    }

    return urlsShiffledSix
}
function loadGame(){
    const urls = shiffledUrlsCapture()
    const duplicateUrls = [ ... urls, ... urls]

    const shiffledUrls = duplicateUrls.sort(() => Math.floor(Math.random() * 5))
    
    createCardAddImageCard(shiffledUrls)

    
    
}


function createCardAddImageCard(urls){
    urls.forEach(urlImage =>{
        const card = createCard(urlImage)
        containerCards.appendChild(card)
    })
}

play.addEventListener('click', async function (){
    urlImages = []
    modal.style.visibility = 'hidden'
    main.style.visibility = 'visible'
    main.lastElementChild.innerHTML = ''
    spanTimer.innerText = '0:00'
   
    await checkTheme()
    await acessUrl()
    await loadGame()
    await startTimer()
})


const rotateCard = ({ target }) => {
    const card = target.parentNode

    checkNumberCard(card)

    if(winnerGame()){
        main.style.visibility = 'hidden'
        clearInterval(timer)
        setTimeout(visibleModalWinner, 700)
    }
    
}

function checkCards(first, second){
    const childrenFirstFront = first.children[0]
    const childrenSecondFront = second.children[0]
    const urlImageFirstCard = window.getComputedStyle(childrenFirstFront).getPropertyValue('background-image')
    const urlImageSecondCard = window.getComputedStyle(childrenSecondFront).getPropertyValue('background-image')

    const checkUrls = urlImageFirstCard == urlImageSecondCard ? true : false

    if(checkUrls){
        cardsEquals(first, second)
    }else{
        setTimeout(cardsNotEquals, 500)     
    }


}

function checkNumberCard(card){
    if(!card.classList.contains('rotate-card')){
        const checkFirstCard = firstCard == '' ? true : false
        const checkSecondCard = secondCard == '' ? true : false

        if(checkFirstCard){
            card.classList.add('rotate-card')
            firstCard = card
        }else if (checkSecondCard){
            card.classList.add('rotate-card')
            secondCard = card
        }

        const checkCardsAdd = !checkFirstCard && checkSecondCard

        if(checkCardsAdd){
            checkCards(firstCard, secondCard)
        }
    }
}

function cardsNotEquals(){
    firstCard.classList.remove("rotate-card")
    secondCard.classList.remove("rotate-card")
    firstCard = ''
    secondCard = ''
}

function cardsEquals(first, second){
    first.children[0].classList.add('card-equals')
    second.children[0].classList.add('card-equals')
    firstCard = ''
    secondCard = ''
}

function winnerGame(){
    const cardsEquals = document.querySelectorAll('.card-equals')

   if(cardsEquals.length == 18){
        return true
   }
}

function startTimer(){
    timer = setInterval(()=>{
        var value = Number(spanTimer.innerText.replace(`${timerValueMinuts}:`, ''))
        var seconds = value + 1
        if(seconds == 60){
            timerValueMinuts += 1
            seconds = 0
        }
        var secondsString = String(seconds)

        if(secondsString.length == 1){
            secondsString = `0${seconds}`
        }

        spanTimer.innerText = `${timerValueMinuts}:${secondsString}`
        timerValue = spanTimer.innerText
    }, 1000)
}

function visibleModalWinner(){
    modal.style.visibility = 'visible'
    const spanWinner = document.querySelector('.winner')
    const spanTimerWinner = document.querySelector('.timerWinner')
    spanWinner.innerText = "PARABÉNS !!! VOCÊ CONSEGUIU!!!"

    spanTimerWinner.innerText = timerValue
    
}

async function checkTheme(){
    const radioThemePokemon = document.getElementById("pokemon")
    const radioThemeRickMorty = document.getElementById("rickmorty")

    if(radioThemePokemon.checked){
        theme = false
        url = 'https://pokeapi.co/api/v2/pokemon?limit=50'
    }else if(radioThemeRickMorty.checked){
        theme = true
        url = 'https://rickandmortyapi.com/api/character'
    }
}


