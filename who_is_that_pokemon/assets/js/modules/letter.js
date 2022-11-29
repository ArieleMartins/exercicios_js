const pokebola = document.querySelector('.pokebola')
export const spanLetterSubmit = document.querySelector(".submit-letter")

export function checkCaracter(pokeName){
    const element = document.getElementById('letter')
    const letter = element.value

    if(letter != ''){
        if(addListLetterSubmit(letter)){

            const posicions = checkPositionLetters(letter, pokeName)
    
            var checkError = !posicions.length != 0
    
            if(checkError){
                pokebola.classList.add('erro-letter')
                setTimeout(removeAnimation, 1200)
            }
        
            correctLetter(posicions, letter)
            
            element.value = ''
        }
    }

    
}

function removeAnimation(){
    pokebola.classList.remove('erro-letter')
}

function correctLetter(posicions, value){
    const containerLetters = document.querySelectorAll('.letter')

    if(posicions.length != 0){
        posicions.forEach(element => {
            containerLetters[element].textContent = value
            containerLetters[element].classList.add("active")
        });
    }
}

function checkPositionLetters(letter, pokeName){
    var posicions = []
    var posicion = -1
    for(var caracter of pokeName){
        posicion += 1
        if(caracter == letter){
            posicions.push(posicion)
        }
    }

    return posicions
}

function addListLetterSubmit(letter){
    if(isNaN(Number(letter))){
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
    
    return checkQuantElements
}