const btnPlay = document.getElementById('btnPlay')
const modal = document.querySelector('.modal')
const inputNumberEnd = document.getElementById('numberEnd')
const inputNumberAttempts = document.getElementById('numberAttempts')
const submitNumberPlayer = document.getElementById('submitNumberPlayer')
const numberPlayer = document.getElementById('numberPlayer')
const guessed = document.getElementById('guessed')
const spanAlert = document.querySelector('.alert')
const error = document.querySelector('.error')
const containerAttempts = document.querySelector('.attempts')
var attempts = 1
var numberBot = 0
var winners = 0

document.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        const styleModal = window.getComputedStyle(modal, null).getPropertyValue('visibility')
        if(styleModal == 'visible'){
            play()
        }else{
            checkNumberPlaye()
        }
    }
})

inputNumberEnd.addEventListener('input', (event)=>{
    const checkData = isNaN(Number(event.data))
    checkDataInputs(checkData, inputNumberEnd)
})

inputNumberAttempts.addEventListener('input', (event) =>{
    const checkData = isNaN(Number(event.data))
    checkDataInputs(checkData, inputNumberAttempts)
})

numberPlayer.addEventListener('input', (event) =>{
    const checkData = isNaN(Number(event.data))
    checkDataInputs(checkData, numberPlayer)
})

btnPlay.addEventListener('click', () =>{
    play()
})

submitNumberPlayer.addEventListener('click', ()=>{
    checkNumberPlaye()
})

function checkDataInputs(data, input){
    if(data){
        input.value = ''
    }
}

function play(){
    if(Number(inputNumberAttempts.value) < 3 || Number(inputNumberAttempts.value) > Number(inputNumberEnd.value) - 1){
        spanAlert.style.color = 'red';
        spanAlert.innerText = "Número de tentativas invalido"
    } else{
        spanAlert.innerText = ''
        modal.style.visibility = "hidden"
        numberBot = moveBot(Number(inputNumberEnd.value))
        numberPlayer.setAttribute('max', inputNumberEnd.value)
        attempts = 1
        containerAttempts.innerHTML = ''
    }
}

function moveBot(numberEnd){
    var number = Math.floor(Math.random() * (numberEnd + 1))
    return number
}

function checkNumberPlaye(){
    if(attempts <= Number(inputNumberAttempts.value)){

        const numberPlayerValue = Number(numberPlayer.value)

        if(numberPlayerValue > Number(inputNumberEnd.value) || numberPlayerValue < 0){
            error.style.color = 'red'
            error.innerText = `Somente números entre 0 e ${inputNumberEnd.value}`
        }else{
            error.innerText = ''

            const checkWinner = numberPlayerValue == numberBot ? true : false

            if(checkWinner){
                winnerPlayer()
            }else{
                if(numberPlayerValue > numberBot){
                    containerAttempts.innerHTML += `<span>O número ${numberPlayerValue} é maior</span>`
                }else if (numberPlayerValue < numberBot){
                    containerAttempts.innerHTML += `<span>O número ${numberPlayerValue} é menor</span>`
                }
                attempts += 1
            }
        }
        

    }else{

        finishedAttempts()

    }
}

function winnerPlayer(){
    spanAlert.style.color = 'rgb(37, 78, 37)'
    spanAlert.innerHTML = "Parabéns você consegui acerta o numero"
    winners += 1
    guessed.innerText = winners
    btnPlay.innerText = "Reset"
    modal.style.visibility = "visible"
}

function finishedAttempts(){
    spanAlert.innerHTML = "Suas tentativas acabaram 🙁"
    btnPlay.innerText = "Reset"
    modal.style.visibility = "visible"
}