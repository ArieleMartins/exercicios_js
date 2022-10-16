import * as calculadora from './modules/calculadora.js'

const number = document.getElementById('btns-number')
const result = document.getElementById('result')
var btns = [
    ['7','8','9'],
    ['4','5','6'],
    ['1','2','3'],
    ['0',".", "CE"]
]


window.onload = function(){
    for(var index = 0; index < btns.length; index++){
        for(var indexArray = 0; indexArray < btns[index].length; indexArray++){
            if(btns[index][indexArray] != 0){
                number.innerHTML += `<div class="btn" id="${btns[index][indexArray]}"><span id="span${btns[index][indexArray]}">${btns[index][indexArray]}</span></div>`
            }else{
                number.innerHTML += `<div class="btn border-bottom-left-radius" id="${btns[index][indexArray]}"><span>${btns[index][indexArray]}</span></div>`
            }
            
        }
    }
    result.innerText = '0'
}

document.addEventListener('click', function(e){

   btns.forEach((valorAtual) =>{
        if(valorAtual.includes(e.target.id.replace('span', ''))){
            calculadora.painel(e.target.id.replace('span', ''), result)
        }
   })

   switch (e.target.id.replace('i', '')){
    case '+':
        calculadora.painel('+', result)
    break;
    case '-':
        calculadora.painel('-', result)
    break;
    case 'x':
        calculadora.painel('x', result)
    break;
    case '%':
        calculadora.painel('%', result)
    break;
   }
   var array = Array.from(result.innerText)
   if(e.target.id.replace('span', '') == '='){
        if(result.innerText != '0' && (array.includes('+') || array.includes('-') || array.includes('x') || array.includes('%')) != false){
            calculadora.calcular(result.innerText, result)
        }
   }

})

document.addEventListener('keyup', function (e){
    switch(e.key){
        case '1':
            calculadora.painel(e.key, result)
        break;
        case '2':
            calculadora.painel(e.key, result)
        break;
        case '3':
            calculadora.painel(e.key, result)
        break;
        case '4':
            calculadora.painel(e.key, result)
        break;
        case '5':
            calculadora.painel(e.key, result)
        break;
        case '6':
            calculadora.painel(e.key, result)
        break;
        case '7':
            calculadora.painel(e.key, result)
        break;
        case '8':
            calculadora.painel(e.key, result)
        break;
        case '9':
            calculadora.painel(e.key, result)
        break;
        case '+':
            calculadora.painel(e.key, result)
        break;
        case '-':
            calculadora.painel(e.key, result)
        break;
        case 'x':
            calculadora.painel(e.key, result)
        break;
        case '%':
            calculadora.painel(e.key, result)
        break;
        case 'Enter':
            var array = Array.from(result.innerText)
            if(result.innerText != '0' && (array.includes('+') || array.includes('-') || array.includes('x') || array.includes('%')) != false){
                calculadora.calcular(result.innerText, result)
            }
        break;
        case 'Backspace':
            calculadora.painel('CE', result)
        break;
        case '.':
            calculadora.painel(e.key, result)
        break;

    }
})
