const pokebola = document.querySelector('.pokebola')
export const spanLetterSubmit = document.querySelector(".submit-letter")


export function checkCaracter(pokeName){
    const element = document.getElementById('letter')
    const letter = element.value
    if(letter != ''){
        if(addListLetterSubmit(letter)){

            var posicions = checkPositionLetters(letter, pokeName)
    
            var checkError = !posicions.length != 0
            
            if(checkError){
                pokebola.classList.add('erro-letter')
                setTimeout(removeAnimation, 1200)
            }else{
                correctLetter(posicions, letter)
            }
        
            element.value = ''
        }
    }

    return checkError
    
}

function removeAnimation(){
    pokebola.classList.remove('erro-letter')
}

function correctLetter(posicions, value){
    const containerLetters = document.querySelectorAll('.letter')
    
    posicions.forEach(element => {
        containerLetters[element].innerText = value
        containerLetters[element].classList.add("active")
    });
}

function checkPositionLetters(letter, pokeName){
    var posicions = []
    var posicion = -1
    for(var caracter of pokeName){
        posicion += 1
        if(caracter.toUpperCase() == letter.toUpperCase()){
            posicions.push(posicion)
        }
        
    }

    return posicions
}

function addListLetterSubmit(letter){
    if(letter){
        if(!spanLetterSubmit.textContent.includes(letter)){
            const elementParend = spanLetterSubmit.parentElement.parentElement
            spanLetterSubmit.textContent += ` ${letter}`
            elementParend.style.visibility = 'visible'
    
            return true
        }
    }

    return false
}

export function checkCompletName(pokeName){
    const elementsActive = document.querySelectorAll('.active')
    const checkQuantElements = elementsActive.length == pokeName.length

    const checkPorcentCorrect= Math.round((pokeName.length * 40) / 100)

    if(elementsActive.length >= checkPorcentCorrect){
        const containerLetters = document.querySelector('.container-letters')
        containerLetters.classList.add("active-complet-name")
    }
    
    return checkQuantElements
}