import { acessUrlPokemonRandom as api } from './modules/api.js'
import { checkCaracter, checkCompletName, spanLetterSubmit} from './modules/letter.js'
import { showModal ,checkSubmitCompletName, showModalList } from './modules/modal.js'

const containerLetters = document.querySelector('.container-letters')
const btnSubmit = document.getElementById('submit-caracter')
const btnClose = document.querySelector('.close')
const btnSubmitName = document.querySelector('.submit-name')
const img = document.getElementById('img-pokemon')
const elementFlash = document.querySelector(".flash")
const btnList = document.getElementById('btn-list')
const iconNew = document.querySelector(".icon-new")

var pokeName
var attemps = 0
var url
var type

startGame()

btnSubmit.addEventListener('click', async () =>{ 
    
    if(checkCaracter(pokeName)){
        attemps += 1
    }

    if(checkCompletName(pokeName)){
        capturePokemonAnimation()
        await addPokemonLocalStorage()
        setTimeout(resetGame, 2900)
    }else if(attemps > 5){
        resetGame()
    }
    

})

containerLetters.addEventListener('click', () => {showModal(true, containerLetters)})

btnClose.addEventListener('click', () =>{showModal(false, containerLetters)})

btnSubmitName.addEventListener('click', async ()=>{
    if(checkSubmitCompletName(pokeName)){
        capturePokemonAnimation()
        await addPokemonLocalStorage()
        setTimeout(resetGame, 2700)
    }else{
        resetGame()
    }

    showModal(false)
})

btnList.addEventListener("click",()=>{
     showModalList(true)
     iconNew.style.visibility = 'hidden' 
})

async function startGame(){
    const object = await api()
    img.src = object.img
    pokeName = object.name
    const test = document.querySelector(".test")
    test.textContent = object.name
    url = object.url
    type = object.typePokemon
    await createAddElement(pokeName)
}

function createAddElement(name){
    for(var index = 0; index < name.length ; index++){
        const element = document.createElement('div')
        element.className = 'letter'
        containerLetters.append(element)
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
    iconNew.style.visibility = 'visible'
    elementFlash.classList.remove('animationFlash')
    img.classList.remove('animationRevealPokemon')
}

function resetGame(){
    startGame()
    clearGame()
}


function addPokemonLocalStorage(){
    var getItemLocalStorage = JSON.parse(localStorage.getItem("Pokémons"))

    if(getItemLocalStorage != null && getItemLocalStorage.length > 0){
       getItemLocalStorage.push({'name': pokeName, "image": img.src, "url": url, 'type': type})
       localStorage.setItem('Pokémons', JSON.stringify(getItemLocalStorage))
    }else{
        localStorage.setItem('Pokémons', JSON.stringify([]))
        var getInitialItemLocalStorage = JSON.parse(localStorage.getItem('Pokémons'))
        getInitialItemLocalStorage.push({'name': pokeName, "image": img.src, "url": url, 'type': type})
        localStorage.setItem('Pokémons', JSON.stringify(getInitialItemLocalStorage))
    }
    
   
}