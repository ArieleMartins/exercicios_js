const url = 'https://rickandmortyapi.com/api/character'
const containerCards = document.querySelector(".container-cards")
const play = document.getElementById("play")
const modal = document.querySelector('.container')

var urlImages = []

async function acessUrl(){
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        
        for (const data of dataJson.results){
            urlImages.push(data.image)
        }
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
    return urlImages
   
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

    front.style.backgroundImage =`url('${urlImage}')`
    
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
    modal.style.visibility = 'hidden'
    await acessUrl()
    await loadGame()
})