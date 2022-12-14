
var verificadorTrocaOperador = false
export function painel(valor, result) {
    (result.innerText == '0' && valor == '0') ? valor = '' : valor

    if (result.innerText == '0' && valor != '0') {
        if ((result.innerText == '0') && (valor != '+' && valor != '-' && valor != 'x' && valor != '/')) {
            var array = Array.from(result.innerText)
            array.splice(0, 1)
            result.innerText = array
        }

    }
    (result.innerText.includes('+') || result.innerText.includes('-') || result.innerText.includes('x') || result.innerText.includes('/')) && (valor == '+' || valor == '-' || valor == 'x' || valor == '/') ? adicionandoOperadores(valor) : valor

    if (verificadorTrocaOperador == true) {
        valor = ""
        verificadorTrocaOperador = false
    }

    var valor1 = []
    var valor2 = []
    var operadores = ['+', '-', 'x', '/']
    var indexOperador

    if (valor == ('.')) {
        if (result.innerText.includes('+') || result.innerText.includes('-') || result.innerText.includes('x') || result.innerText.includes('/')) {
            var array = Array.from(result.innerText)
            operadores.forEach(element => {
                if (array.indexOf(element) != -1) {
                    indexOperador = array.indexOf(element)
                }
            })

            for (var index = 0; index < array.length; index++) {
                if (index < indexOperador) {
                    valor1.push(array[index])
                } else if (index > indexOperador) {
                    valor2.push(array[index])
                }
            }

            if (valor1.includes('.')) {
                valor = ''
            } else {
                valor = '.'
            }
            if (valor2.includes('.')) {
                valor = ''
            } else {
                valor = '.'
            }


        } else {
            if (result.innerText.includes('.')) {
                valor = ''
            } else {
                valor
            }
        }
    }

    if (valor == 'CE') {
        result.innerText = ''
        valor = '0'
    }


    result.innerText += valor
}

function adicionandoOperadores(valor) {
    var array = Array.from(result.innerText)
    var operadores = ['+', '-', 'x', '/']
    var indexOperador = -1
    if(array[0] == '-'){
        array[0] = ''
    }
    array.forEach(element =>{
        operadores.forEach(op =>{
            if(element == op){
                    indexOperador = array.indexOf(element)
            }else if(array.includes('+') == false && array.includes('-') == false && array.includes('x') == false && array.includes('/') == false){
                indexOperador = array.length
            }
        })
    })
    array[indexOperador] = valor
    if(array[0] == '' ){
        array[0] = '-'
    }
    result.innerText = array.join('')
    verificadorTrocaOperador = true
}

export function calcular(conteudo, result) {
    var array = Array.from(conteudo)
    var operadores = ['+', '-', 'x', '/']
    var valor1 = []
    var valor2 = []
    var operador
    var indexOperador
    var unirValor1
    var unirValor2
    var resultado
    if(array[0] == '-'){
        array[0] = ''
    }
    operadores.forEach(element => {
        if (array.indexOf(element) != -1) {
            indexOperador = array.indexOf(element)
            operador = element
        }
    })
    for (var index = 0; index < array.length; index++) {
        if (index < indexOperador) {
            if(array[0] == ''){
                array[0] = '-'
            }
            valor1.push(array[index])
        } else if (index > indexOperador) {
            valor2.push(array[index])
        }
    }
    if (valor1.length != 0 && valor2.length != 0) {
        unirValor1 = parseFloat(valor1.join(''))
        unirValor2 = parseFloat(valor2.join(''))
        switch (operador) {
            case '+':
                resultado = unirValor1 + unirValor2
                break;
            case '-':
                resultado = unirValor1 - unirValor2
                break;
            case 'x':
                resultado = unirValor1 * unirValor2
                break;
            case '/':
                resultado = unirValor1 / unirValor2
                break;
        }

        if (resultado != undefined) {
            result.innerText = resultado
        }
    }




}