// variavel - armazena dados
// a variavel deve ter nomes significativos
// const - o dados armazenado não pode ser manipulado ( ter o valor alterado ou redeclarado).

//Funções

//declarando
/*function soma(a, b)
    console.log(a + b);
    return a + b; // quando você precisa manipular o resultado em outra função
}

//chamando
soma(160, 340);*/

/*function returnEvenValues(array){
    let evenNums = [];
    for(let i = 0; i < array.length; i++){
        if(array[i] % 2 == 1){ //0 = par 1 = impar
            evenNums.push(array[i]) //atualizando os dados do array;
        }
    }
    console.log(evenNums);
}

let array = [1,2,4,5,6,7];

returnEvenValues(array);*/

// ELEMENTOS DOM

//DOCUMENT OBJECT MODEL - estruturas dos elementos

//document.getElementByTagName('h1') - retornar todos os elementos h1.

//var h1 = document.getElementsByTagName('h1')[0];
//h1.style.color = "red";


var num = document.getElementById("num");
var ad = document.getElementById("ad");
var sub = document.getElementById("sub");
var numero = num.innerText;
ad.addEventListener('click', function adicionar(){
    numero = parseInt(numero) + 1;
    if(numero >= 0){
        num.style.color = 'white';
    }else{
        num.style.color = 'red';
    }
    num.innerHTML = numero;

});
sub.addEventListener('click', function subtrair(){
    numero = parseInt(numero) - 1
    if(numero < 0){
        num.style.color = 'red';
    }else{
        num.style.color = 'white';
    }
    num.innerHTML = numero;
}
)



