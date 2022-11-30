import { acessUrl as api } from './modules/api.js'
import { checkCaracter, checkCompletName, spanLetterSubmit} from './modules/letter.js'
import { checkSubmitCompletName } from './modules/modal.js'

const containerLetters = document.querySelector('.container-letters')
const btnSubmit = document.getElementById('submit-caracter')
const btnClose = document.querySelector('.close')
const btnSubmitName = document.querySelector('.submit-name')
const img = document.getElementById('img-pokemon')
const elementFlash = document.querySelector(".flash")


var pokeName
var attemps = 0
var urls = []
var url

startGame()

btnSubmit.addEventListener('click', () =>{ 

    if(checkCaracter(pokeName, attemps)){
        attemps += 1
    }

    if(checkCompletName(pokeName)){
        capturePokemonAnimation()
        urls.push({'name': pokeName, "image": img.src, "url": url})
        localStorage.setItem('Pokémons', JSON.stringify(urls))
        setTimeout(resetGame, 2900)
    }else if(attemps > 5){
        resetGame()
    }
    
    console.log(urls)

})

containerLetters.addEventListener('click', () => {showModal(true)})

btnClose.addEventListener('click', () =>{showModal(false)})

btnSubmitName.addEventListener('click', ()=>{
    if(checkSubmitCompletName(pokeName)){
        capturePokemonAnimation()
        urls.push({'name': pokeName, "image": img.src, "url": url})
        localStorage.setItem('Pokémons', JSON.stringify(urls))
        showModal(false)
    }else{
        startGame()
        clearGame()
        showModal(false)
    }
})

async function startGame(){
    const object = await api()
    img.src = object.img
    pokeName = object.name
    url = object.url
    await createAddElement(pokeName)
    console.log(pokeName)
}

function createAddElement(name){
    for(var index = 0; index < name.length ; index++){
        const element = document.createElement('div')
        element.className = 'letter'
        containerLetters.append(element)
    }
}

function showModal(show){
    const modal = document.querySelector('.container-modal')
    if(show){
        if(containerLetters.classList.contains('active-complet-name')){
            modal.style.display = 'flex'
        }
    }else{
        modal.style.display = 'none'
    }
    
}


function clearGame(){
    containerLetters.innerHTML = ''
    spanLetterSubmit.textContent = ''
    spanLetterSubmit.parentElement.parentElement.style.visibility = "hidden"
    attemps = 0
    containerLetters.classList.remove('active-complet-name')
}

function capturePokemonAnimation(){
    
    elementFlash.classList.add('animationFlash')
    img.classList.add('animationRevealPokemon')
    setTimeout(removeAnimationCapture, 2480)
}

function removeAnimationCapture(){
    const iconNew = document.querySelector(".icon-new")
    iconNew.style.visibility = 'visible'
    elementFlash.classList.remove('animationFlash')
    img.classList.remove('animationRevealPokemon')
}

function resetGame(){
    startGame()
    clearGame()
}
