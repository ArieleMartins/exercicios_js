import { acessUrl as api } from './modules/api.js'
import { checkCaracter, checkCompletName, spanLetterSubmit} from './modules/letter.js'
import { checkSubmitCompletName } from './modules/modal.js'

const containerLetters = document.querySelector('.container-letters')
const btnSubmit = document.getElementById('submit-caracter')
const btnClose = document.querySelector('.close')
const btnSubmitName = document.querySelector('.submit-name')

var pokeName
var attemps = 0

startGame()

btnSubmit.addEventListener('click', () =>{ 

    if(checkCaracter(pokeName, attemps)){
        attemps += 1
    }

    if(checkCompletName(pokeName) || attemps == 6){
        startGame()
        clearGame()
    }
})

containerLetters.addEventListener('click', () => {showModal(true)})

btnClose.addEventListener('click', () =>{showModal(false)})

btnSubmitName.addEventListener('click', ()=>{ 
    if(checkSubmitCompletName(pokeName)){
        console.log('foi')
        showModal(false)
    }else{
        startGame()
        clearGame()
        showModal(false)
    }
})

async function startGame(){
    const object = await api()
    const img = document.getElementById('img-pokemon')
    img.src = object.img
    pokeName = object.name
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
    attemps = 0
    containerLetters.classList.remove('active-complet-name')
}