var numero = 0;
var input = document.getElementById('dados');
var enviar = document.getElementById('enviar');
var pontuacao = document.getElementById('adivinho');
var pontos = 0;
var tentativa = 0;
var tentativas = document.getElementById('tentativas');
window.document.body.onload = function gerarNumero(){
    numero = Math.floor(Math.random() * 101);
}

enviar.onclick = function veriNumero(){
    if(tentativa >= 10){
        window.alert('Desclpa :( Você gastou todas as 10 tentativas tente novamente');
        numero = numero = Math.floor(Math.random() * 101);
        tentativa = 0;
        tentativas.innerHTML = "";
    }else{
    if(input.value == ''){
        window.alert('Por Favor Digite Um Número');
    }else{
        var n = parseInt(input.value);
        if(n < numero){
            tentativas.innerHTML += "<p>O número " + n + " é menor";
            tentativa = tentativa + 1;
        }else if(n > numero){
            tentativas.innerHTML += "<p>O número " + n + " é maior";
            tentativa = tentativa + 1;
        }else if(n == numero){
            window.alert("Parabéns você conseguiu adivinhar o número");
            tentativas.innerHTML = "";
            numero = Math.floor(Math.random() * 101);
            pontos = pontos + 1;
            pontuacao.innerHTML = "Você conseguiu adivinha: " + pontos + " números";
            tentativa = 0;
        }
        
    }
}
    
}
