//window.alert() - mensagem de alerta
//window.corfim() - esperar a confirmação do usuario
//window.prompt() - espera entrada de dados do usuario
var bt = document.getElementById('ad');
var input = document.getElementById('dados');
var list = document.getElementById('list');
const erro = document.getElementById('error')
var index = [];

bt.addEventListener('click', function adicionar() {
    var dados = input.value;
    if (!dados) {
        erro.style.color = 'red';
        erro.style.fontSize = '12px'
        erro.style.textAlign = 'center'
        erro.style.width = '100%'
        erro.innerText = 'Por favor preencha o campo'
    } else {
        if (index.length > 0) {
            if (index.includes(dados)) {
                erro.style.color = 'red';
                erro.style.fontSize = '12px'
                erro.style.textAlign = 'center'
                erro.style.width = '100%'
                erro.innerText = 'Tarefa já adicionada'
            } else {
                erro.innerText = ""
                list.innerHTML += `<li id='${dados}'><div style='display:flex; column-gap:10px; '><input type='checkbox''><label style="display:flex;flex-wrap:wrap">${dados}</label></div><div><button  class="delete" id='${dados}'><i class="fa-solid fa-trash-can"></i></button></div></li>`;
                input.value = "";
                index.push(dados);
            }
        } else {
            erro.innerText = ""
            list.innerHTML += `<li id='${dados}'><div style='display:flex; column-gap:10px; '><input type='checkbox''><label style="display:flex;flex-wrap:wrap">${dados}</label></div><div><button  class="delete" id='${dados}'><i class="fa-solid fa-trash-can"></i></button></div></li>`;
            input.value = "";
            index.push(dados);
        }


    }
    for (var i = 0; i < index.length; i++) {
        const del = document.getElementById(index[i])
        deleteElemento(index, index[i], del)
    }
})
function deleteElemento(index, dado, elemento) {
    elemento.addEventListener('click', function deletar() {
        if(index.includes(dado)){
            var posicao = index.indexOf(dado)
            index.splice(posicao, 1)
        }           
        const valor = document.getElementById(elemento.id)
        list.removeChild(valor);
    })
} 