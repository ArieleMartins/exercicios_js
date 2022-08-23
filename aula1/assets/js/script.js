//window.alert() - mensagem de alerta
//window.corfim() - esperar a confirmação do usuario
//window.prompt() - espera entrada de dados do usuario
var bt = document.getElementById('ad');
var input = document.getElementById('dados');
var list = document.getElementById('list');
bt.addEventListener('click', function adicionar() {
    var dados = input.value;
    list.innerHTML += "<li id='item'><input type='checkbox''><label>" + dados + "</label></li>";
    input.value = "";
})
