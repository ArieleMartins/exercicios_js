const spanWinner = document.querySelector('.winner')
const spanTimerWinner = document.querySelector('.timerWinner')
const accessbilityModal = document.getElementById('accessibility-modal')
const close = document.getElementById('close')
const modalAcces = document.querySelectorAll('.container')
const btn = document.getElementById('active-access')
const customize = document.querySelector(".container-customize")
const rangeSpan = document.querySelector(".range-timer")
const rangeTimer = document.getElementById("range-timer")

var accessibility = false

export function visibleModalWinner(main, modal, containerCards, spanTimer){  // se ele ganhou faça
    spanTimerWinner.innerText = spanTimer.innerText
    containerCards.innerHTML = ''
    main.style.visibility = 'hidden'
    modal.style.visibility = 'visible'
    spanWinner.style.color = 'green'
    spanWinner.innerText = "PARABÉNS !!! VOCÊ CONSEGUIU!!!" 
}

export function visibleModalFail( main, modal, containerCards, spanTimer){
    spanTimerWinner.innerText = spanTimer.innerText
    containerCards.innerHTML = ''
    main.style.visibility = 'hidden'
    modal.style.visibility = 'visible'
    spanWinner.style.color = 'red'
    spanWinner.innerText = "PERDEU!!! 😭" 
}

export function visibilityModalError(){
    const  modalError = document.querySelector('.modal-error')
    modalError.style.visibility = 'visible'
    var widthBarErro = 10
    const barErro = document.querySelector('.loading-bar')
    var timerError = setInterval(() => {
        widthBarErro += 10

        barErro.style.width = `${widthBarErro}%`

        if(widthBarErro >= 100){
            clearInterval(timerError)
            modalError.style.visibility = 'hidden'
            barErro.style.width = `0%`
        }
    }, 500);

}

accessbilityModal.addEventListener('click', () =>{
    if(modalAcces[1].classList.contains('disabled')){
        const result = document.querySelector(".result-check")
        

        if(accessibility){
            btn.innerText = "Desativar"
        }else{
            btn.innerText = 'Ativar'
        }
        if(customize.classList.contains('customize')){
            customize.style.visibility = 'hidden'
            rangeSpan.style.visibility = 'hidden'
            rangeTimer.style.visibility = 'hidden'
        }
        
        modalAcces[0].style.visibility = 'hidden'
        modalAcces[1].classList.remove('disabled')

        if(window.speechSynthesis){
            result.style.color = 'green'
            result.innerText = "Possui Suporte"
        }else{
            result.style.color = 'red'
            result.innerText = "Não possui Suporte"
        }
    }
})

close.addEventListener('click', () =>{
    if(!modalAcces[1].classList.contains('disabled')){
        const checkbox = document.getElementById("numberTimer")
        modalAcces[0].style.visibility = 'visible'
        modalAcces[1].classList.add('disabled')
        if(customize.classList.contains('customize')){
            customize.style.visibility = 'visible'
            if(checkbox.checked){
                rangeSpan.style.visibility = 'visible'
                rangeTimer.style.visibility = 'visible'
            }
        }else{
            customize.style.visibility = 'hidden'
            rangeSpan.style.visibility = 'hidden'
            rangeTimer.style.visibility = 'hidden'
        }
    }
})

btn.addEventListener("click", () =>{
    if(accessibility){
        accessibility = false
        btn.innerText = 'Ativar'
        audioActive(false)
    }else{
        accessibility = true
        btn.innerText = "Desativar"
        audioActive(true)
    }
})


function audioActive(active){
    var msg = new SpeechSynthesisUtterance()

    if(active){
        msg.text = "Áudio Ativado"
    }else{
        msg.text = "Áudio Desativado"
    }

    window.speechSynthesis.speak(msg)
}

export function checkAudioActive(){
    return accessibility
}
