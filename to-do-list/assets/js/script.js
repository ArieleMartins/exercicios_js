//window.alert() - mensagem de alerta
//window.corfim() - esperar a confirmação do usuario
//window.prompt() - espera entrada de dados do usuario
var bt = document.getElementById('ad');
var input = document.getElementById('dados');
var list = document.getElementById('list');
const erro = document.getElementById('error')
var index = [];
var total = 0;
bt.addEventListener('click', function adicionar() {
    var dados = input.value;
    if (!dados) {
        erro.style.color = 'red';
        erro.style.fontSize = '12px'
        erro.style.textAlign = 'center'
        erro.style.width = '100%'
        erro.innerText = 'Por favor preencha o campo'
    } else {
        erro.innerText = ""
        list.innerHTML += `<li id='${dados}'><div style='display:flex; column-gap:10px; '><input type='checkbox''><label style="display:flex;flex-wrap:wrap">${dados}</label></div><div><button  class="delete" id='${total}' value='${dados}' ><i class="fa-solid fa-trash-can"></i></button></div></li>`;
        input.value = "";
        index.push(total);
        total = total + 1
        total = index;
    }
    for (var i = 0; i < index.length; i++){
        const del = document.getElementById(i)
        del.addEventListener('click', function deletar(){
            console.log(index);
            const elemento = document.getElementById(del.value)
            list.removeChild(elemento);
            index.splice(i, 1);
            console.log(index)
        })
    }
})