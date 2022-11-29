import { acessUrl as api } from './modules/api.js'
import { checkCaracter, checkCompletName, spanLetterSubmit } from './modules/letter.js'

const containerLetters = document.querySelector('.container-letters')
const btnSubmit = document.getElementById('submit-caracter')
var pokeName


initialGame()

btnSubmit.addEventListener('click', () =>{ 
    checkCaracter(pokeName)
    if(checkCompletName(pokeName)){
        startGame()
        containerLetters.innerHTML = ''
        spanLetterSubmit.textContent = ''
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

