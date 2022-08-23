var input = document.getElementById('dados');
var adicionar = document.getElementById('ad');
var calcular = document.getElementById('calc');
var media = document.getElementById('media');
var notas = document.getElementById('notas');
var array = [];
var i = 0;
var soma = 0;
adicionar.addEventListener('click', function add(){
    var nota = parseFloat(input.value);
    if(nota >= 0 & nota <= 10){
    i = i + 1;
    array.push(nota);
    notas.innerHTML += '<p>' + i + ' - ' + nota + '</p>';
    input.value = '';
}else{
    window.alert("Somente números positivos e de 0 até 10");
}
})

calcular.addEventListener('click', function calc(){
    if(array == ""){
        window.alert('Por favor adicione as notas');
        media.innerHTML = "";
    }else{
    for(var j = 0; j < array.length; j++){
        soma = array[j] + soma;
        console.log(soma);
    }
    var md = soma/array.length;
    media.innerHTML = "A média é: " + md;
    array = [];
    i = 0;
    notas.innerHTML = '';
}
})