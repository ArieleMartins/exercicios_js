const spanWinner = document.querySelector('.winner')
const spanTimerWinner = document.querySelector('.timerWinner')

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
