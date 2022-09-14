import * as categorias from "./modules/categorias.js";
import * as movies from "./modules/movies.js";

// criando e removendo categoria
const abrirModal = document.getElementById('btnAbrirModal');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const criarCategoria = document.getElementById('criarCategoria');
const selectCategorias = document.getElementById('categorias');
const listaCategorias = document.getElementById('listaCategorias');
//array para armazenar as categorias
var categoria = [];

// adicionando movie
var selectedCategoria = document.getElementById('categorias');
var erro = document.getElementById("erroCamposVazio");
const btnsCategoria = document.getElementById('containerCategoria'); //container onde ficarão os botões das categorias
const containerMovie = document.getElementById('containerMovie'); // container onde ficarão os movies


// funcões do criar e remover categoria
close.addEventListener('click', function fecharModal() {
    modal.style.display = 'none';
    listaCategorias.innerHTML = "";
})

abrirModal.addEventListener('click', function abrirModal() {
    modal.style.display = "flex";
    modal.style.position = "fixed";
    for (var i = 0; i < categoria.length; i++) {
        listaCategorias.innerHTML += '<option value="' + categoria[i] + '">'+ categoria[i] + '</option>';
    }
})

criarCategoria.addEventListener('click', function criandoCategorias() {
    var alerta = document.getElementById('alerta');
    var nomeCategoria = document.getElementById('nomeCat');
    if (!nomeCategoria.value) {
        alerta.innerText = 'Por favor digite o nome da categoria no campo';
    } else {
        categorias.criandoCategoria(alerta, nomeCategoria, categoria, selectCategorias, listaCategorias, btnsCategoria);
    }
})

var removerCat = document.getElementById('removerCategoria').addEventListener('click', function removerCategoria(){
    var indexCategoria = listaCategorias.selectedIndex;;
    var options = document.getElementsByTagName('option');
    categorias.removendoCategoria(indexCategoria, options, selectCategorias, categoria, listaCategorias, btnsCategoria);
})

// funcão de adicionar movie
const btnAdicionar = document.getElementById('btnAdicionar').addEventListener('click', function addMovie(){
    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('desc').value;
    var capa = document.getElementById('url').value;
    if(!titulo || !descricao || !capa || selectedCategoria.selectedIndex < 0){
        erro.innerText = "Por favor preencha os campos e selecione/crie uma categoria";
    }else{
        erro.innerText = "";
        var select = selectedCategoria.selectedIndex;
        var movieCategoria = selectedCategoria.options[select].text;
        movies.adicionarMovie(titulo, descricao, capa, movieCategoria, categoria, btnsCategoria, containerMovie);
    }
 
})

btnsCategoria.onmouseenter = function (){
    if(categoria.length >= 0){
        for(var i = 0; i < categoria.length; i++){
            const btnMovie = document.getElementsByClassName('btnsCategoria');
            const botao = document.getElementById(btnMovie[i].value);
            botao.addEventListener('click', function (){
                movies.exibirMovieCategoria(containerMovie, botao.value, categoria);
            });
        }
    }
}
