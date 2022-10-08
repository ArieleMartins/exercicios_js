//window.alert() - mensagem de alerta
//window.corfim() - esperar a confirmação do usuario
//window.prompt() - espera entrada de dados do usuario
var bt = document.getElementById('ad');
var input = document.getElementById('dados');
var list = document.getElementById('list');
const erro = document.getElementById('error')
const select = document.getElementById('filter');


const pesquisa = document.getElementById('pesquisar')
var index = [];
var contador = 1;
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
                list.innerHTML += `<li id='${dados}' ><div style='display:flex; column-gap:10px; '><input type='checkbox''><label style="display:flex;flex-wrap:wrap">${dados}</label></div><div><button  class="delete" value='${dados}' id="btnElement${dados}"><i class="fa-solid fa-trash-can" id="element${dados}"> </i></button></div></li>`;
                input.value = "";
                contador = contador + 1;
                index.push(dados);
            }
        } else {
            erro.innerText = ""
            list.innerHTML += `<li id='${dados}'><div style='display:flex; column-gap:10px; '><input type='checkbox''><label style="display:flex;flex-wrap:wrap">${dados}</label></div><div><button  class="delete" value='${dados}' id="btnElement${dados}"><i class="fa-solid fa-trash-can" id="element${dados}"></i></button></div></li>`;
            input.value = "";
            contador = contador + 1;
            index.push(dados);
            
        }


    }
    
})
function deleteElemento(index, dado) {
        if(index.includes(dado)){
            var posicao = index.indexOf(dado)
            index.splice(posicao, 1)
        }           
        const elementLiDelete = document.getElementById(dado)
        list.removeChild(elementLiDelete);
} 

pesquisar.addEventListener('click', function (){
    const valorBuscar = document.getElementById("buscar")
        const listaLi = list.children;
        if(listaLi.length > 0){
            for(var posicao = 0; posicao < listaLi.length; posicao++){
                if(valorBuscar.value == ''){
                    listaLi[posicao].classList.remove('hidden')
                }else{
                    if(listaLi[posicao].id != valorBuscar.value){
                        if(index.includes(valorBuscar.value)){
                            listaLi[posicao].classList.add('hidden');
                        }else{
                            listaLi[posicao].classList.remove('hidden')
                        }
                        
                    }else{
                        listaLi[posicao].classList.remove('hidden')
                    }
                }
                
            }
    }
})

document.addEventListener('click', function (e){
    if(index.includes(e.target.id.replace('btnElement', ''))){
        if(e.target.id == 'btnElement' + e.target.id.replace('btnElement', '')){
            deleteElemento(index, e.target.value)
        }
        
    }else if(index.includes(e.target.id.replace('element', '')) ){
        if(e.target.id == 'element' + e.target.id.replace('element', '')){
            
            deleteElemento(index, e.target.id.replace('element', ''))
        }
        
    }

})

select.addEventListener('change', function (){
    var indexSelect = select.selectedIndex;
    var option = select.options[indexSelect];
    if(option.value == "Feitos"){
        if(list.children != undefined){
            for(var index = 0; index < list.children.length; index++){
                if(list.children[index].children[0].children[0].checked){
                    list.children[index].style.display = "flex"
                }else{
                    list.children[index].style.display = "none"
                }
            }
        }
    }else if(option.value == "Todos"){
        if(list.children != undefined){
            for(var index = 0; index < list.children.length; index++){
                list.children[index].style.display = "flex"
            }
        }
    }else if(option.value == "Fazer"){
        if(list.children != undefined){
            for(var index = 0; index < list.children.length; index++){
                if(list.children[index].children[0].children[0].checked == false){
                    list.children[index].style.display = "flex"
                }else{
                    list.children[index].style.display = "none"
                }
            }
        }
    }
})

document.addEventListener('keydown', function (e){
    if(e.target.id == "dados"){
        if(e.key == 'Enter'){
            bt.click()
        }
    }else if(e.target.id == 'buscar'){
        if(e.key == 'Enter'){
            pesquisa.click()
        }
    }
})