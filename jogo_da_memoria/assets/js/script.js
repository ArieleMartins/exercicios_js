const containerCards = document.querySelector(".container-cards")
const play = document.getElementById("play")
const modal = document.querySelector('.container')
const main = document.querySelector('.container-main')
const spanTimer = document.querySelector('.timer')

var theme = true
var firstCard = ''
var secondCard = ''
var urlImages = []

var timerValueSeconds = 0
var timerValueMinuts = 0
var timer 

async function acessUrl(url){ // metodo para acessar as urls
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

async function acessUrlPokemon(url){ // acessar as urls que a url do pokemon passa
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        urlImages.push(dataJson.sprites.front_default)
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
}


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



function shiffledUrlsCapture(){ // enbaralhando as urls e pegando somente seis delas
    var urlsShiffledSix = []
    
    const shiffledUrls = urlImages.sort(() => Math.floor(Math.random() * 5))

    for (var index = 0; index < 9; index++){
        urlsShiffledSix.push(shiffledUrls[index])
    }

    return urlsShiffledSix
}

function loadGame(){ // iniciando o jogo
    const urls = shiffledUrlsCapture() // pegando as seis urls embaralhadas
    const duplicateUrls = [ ... urls, ... urls] // duplicando-as

    const shiffledUrls = duplicateUrls.sort(() => Math.floor(Math.random() * 5)) // embaralhando novamente
    
    createCardAddImageCard(shiffledUrls)
}


function createCardAddImageCard(urls){ // criando e adicionando a url no element, e adicionando no container cards 
    urls.forEach(urlImage =>{
        const card = createCard(urlImage)
        containerCards.appendChild(card)
    })
}

play.addEventListener('click', async function (){ // quando o usuário aperta play
    urlImages = [] // zerar as urls
    modal.style.visibility = 'hidden' // esconder o modal
    main.style.visibility = 'visible' // deixar o contianer principal visivel
    main.lastElementChild.innerHTML = '' // zerar o container cards
    spanTimer.innerText = '0:00' // zerar o timer
   
    const url = await checkTheme()
    await acessUrl(url)
    await loadGame()
    await startTimer()
})


const rotateCard = ({ target }) => { // pegar os dados da card ao clicar nela
    const card = target.parentNode // pegando o elemento pai

    checkNumberCard(card) 

    if(winnerGame()){
        main.style.visibility = 'hidden'
        clearInterval(timer) // parar o timer
        setTimeout(visibleModalWinner, 700) // depois de alguns milisegundo executar a funcao visiblemodalwinner
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

function checkCards(first, second){ // verificando se as cartas selecionadas são iguais
    const childrenFirstFront = first.children[0] // pegando o primeiro filho da card
    const childrenSecondFront = second.children[0] 
    const urlImageFirstCard = window.getComputedStyle(childrenFirstFront).getPropertyValue('background-image') // pegando o valor da propriedade css background-image
    const urlImageSecondCard = window.getComputedStyle(childrenSecondFront).getPropertyValue('background-image')

    const checkUrls = urlImageFirstCard == urlImageSecondCard ? true : false // vericando se são iguais

    if(checkUrls){ // se for execute
        cardsEquals(first, second)
    }else{ // senao execute
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

function winnerGame(){ // verificar se o usuário conseguiu achar os pares de todas as cartas
    const cardsEquals = document.querySelectorAll('.card-equals')

   if(cardsEquals.length == 18){
        return true
   }
}

function startTimer(){ // iniciando o timer
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

function visibleModalWinner(){ // se ele ganhou faça
    modal.style.visibility = 'visible'
    const spanWinner = document.querySelector('.winner')
    const spanTimerWinner = document.querySelector('.timerWinner')
    spanWinner.innerText = "PARABÉNS !!! VOCÊ CONSEGUIU!!!"

    spanTimerWinner.innerText = timerValue
    
}

async function checkTheme(){ // verificar o tema selecionado pelo usuário
    const radioThemePokemon = document.getElementById("pokemon")
    const radioThemeRickMorty = document.getElementById("rickmorty")

    if(radioThemePokemon.checked){
        theme = false
        var url = 'https://pokeapi.co/api/v2/pokemon?limit=50'
        return url
    }else if(radioThemeRickMorty.checked){
        theme = true
        var url = 'https://rickandmortyapi.com/api/character'
        return url
    }
}


