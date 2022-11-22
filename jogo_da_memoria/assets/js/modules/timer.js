import { visibleModalFail } from "./modal.js"

const checkboxTimer = document.getElementById('numberTimer')
const spanRangeTimer = document.querySelector('.range-timer')
const rangeTimer = document.getElementById('range-timer')

checkboxTimer.checked = false

export function startTimer(main, modal, containerCards, checkFloatRangeTimer, checkRangeTimer, timerValueMinuts, spanTimer, dificult){ // iniciando o timer
    var checkSecondsRangeTimer
    var timer = setInterval(()=>{
        var valueSpanTimer = Number(spanTimer.innerText.replace(`${timerValueMinuts}:`, ''))
        var seconds = valueSpanTimer + 1
        if(seconds == 60){
            timerValueMinuts += 1
            seconds = 0
        }
        var secondsString = String(seconds)

        if(secondsString.length == 1){
            secondsString = `0${seconds}`
        }

        spanTimer.innerText = `${timerValueMinuts}:${secondsString}`

        if(dificult && checkboxTimer.checked){
            
            checkFloatRangeTimer = (timerValueMinuts >= Number(rangeTimer.value.replace('.5', ''))  && timerValueMinuts != 0) && seconds >= Number(`${rangeTimer.value.replace(`${rangeTimer.value.replace('.5', '')}.`, '')}0`)
            checkRangeTimer = timerValueMinuts >= Number(rangeTimer.value) && timerValueMinuts != 0
            checkSecondsRangeTimer = Number(rangeTimer.value.replace('0.', '')) == seconds && Number(rangeTimer.value.replace('0.', '')) > seconds || (Number(rangeTimer.value.replace('0.', '') + '0')  == seconds && Number(rangeTimer.value.replace('0.', '')) == 5)
    
            if(checkFloatRangeTimer || checkRangeTimer || checkSecondsRangeTimer){
                clearInterval(timer)
                setTimeout(visibleModalFail( main, modal, containerCards, spanTimer), 500)
            }
        }
        
    }, 1000)
    
    return timer
}

checkboxTimer.addEventListener("click", ()=>{
    if(checkboxTimer.checked){
        spanRangeTimer.style.visibility = 'visible'
        rangeTimer.style.visibility = 'visible'
        
    }else{
        spanRangeTimer.style.visibility = 'hidden'
        rangeTimer.style.visibility = 'hidden'
    }
    
})

rangeTimer.addEventListener('input', ()=>{
    spanRangeTimer.innerText = ` ${rangeTimer.value} minutos`
})