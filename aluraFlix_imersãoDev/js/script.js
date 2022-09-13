import * as categorias from "./modules/categorias.js";
import * as movies from "./modules/adicionar.js";

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
var titulo = document.getElementById('titulo').value;
var descricao = document.getElementById('desc').value;
var capa = document.getElementById('url').value;
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
        categorias.criandoCategoria(alerta, nomeCategoria, categoria, selectCategorias, listaCategorias);
    }
})

var removerCat = document.getElementById('removerCategoria').addEventListener('click', function removerCategoria(){
    var indexCategoria = listaCategorias.selectedIndex;;
    var options = document.getElementsByTagName('option');
    categorias.removendoCategoria(indexCategoria, options, selectCategorias, categoria, listaCategorias);
})

// funcão de adicionar movie
const btnAdicionar = document.getElementById('btnAdicionar').addEventListener('click', function addMovie(){
    console.log(selectedCategoria.selectedIndex);
    if(!titulo || !descricao || !capa || selectedCategoria.selectedIndex < 0){
        erro.innerText = "Por favor preencha os campos e selecione/crie uma categoria";
    }else{
        erro.innerText = "";
        var selecionado = selectedCategoria.selectedIndex;
        var movieCategoria = selectedCategoria.options[selecionado].text;

        movies.adicionarMovie(titulo, descricao, capa, movieCategoria, btnsCategoria, containerMovie);
    }
 
})