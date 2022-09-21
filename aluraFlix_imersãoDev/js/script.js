import * as generos from "./modules/genero.js";
import * as movies from "./modules/movies.js";

// criando e removendo genero
const abrirModal = document.getElementById('btnAbrirModal');
const modal = document.getElementById('modal');
const close = document.getElementById('close');
const criargenero = document.getElementById('criarGenero');
const selectGeneros = document.getElementById('generos');
const listaGeneros = document.getElementById('listaGeneros');
//array para armazenar as generos
var genero = [];

// adicionando movie
var selectedGenero = document.getElementById('generos');
var erro = document.getElementById("erroCamposVazio");
const btnsGenero = document.getElementById('containerGenero'); //container onde ficarão os botões das generos
const containerMovie = document.getElementById('containerMovie'); // container onde ficarão os movies
var moviesDados = [];

// funcões do criar e remover genero
close.addEventListener('click', function fecharModal() {
    modal.style.display = 'none';
    listaGeneros.innerHTML = "";
})

abrirModal.addEventListener('click', function abrirModal() {
    modal.style.display = "flex";
    modal.style.position = "fixed";
    for (var i = 0; i < genero.length; i++) {
        listaGeneros.innerHTML += '<option value="' + genero[i] + '">' + genero[i] + '</option>';
    }
})

criarGenero.addEventListener('click', function criandogeneros() {
    var alerta = document.getElementById('alerta');
    var nomeGenero = document.getElementById('nomeGe');
    if (!nomeGenero.value) {
        alerta.innerText = 'Por favor digite o nome da genero no campo';
    } else {
        generos.criandoGenero(alerta, nomeGenero, genero, selectGeneros, listaGeneros, btnsGenero);
    }
    if (genero.length >= 0) {
        for (var i = 0; i < genero.length; i++) {
            const btnMovie = document.getElementsByClassName('btnsGenero');
            const botao = document.getElementById(btnMovie[i].value);
            var movieGenero = btnMovie[i].value;
            botao.addEventListener('click', function () {
                movies.exibirMovieGenero(containerMovie, botao.value, moviesDados, genero);
            });
        }
    }
})

var removerGe = document.getElementById('removerGenero').addEventListener('click', function removerGenero() {
    
    var indexGenero = listaGeneros.selectedIndex;;
    var options = document.getElementsByTagName('option');
    generos.removendoGenero(indexGenero, options, selectGeneros, genero, listaGeneros, btnsGenero, containerMovie, moviesDados);
    if (genero.length >= 0) {
        for (var i = 0; i < genero.length; i++) {
            const btnMovie = document.getElementsByClassName('btnsGenero');
            const botao = document.getElementById(btnMovie[i].value);
            botao.addEventListener('click', function () {
                movies.exibirMovieGenero(containerMovie, botao.value, moviesDados, genero);
            });
        }
    }
    
})

// funcão de adicionar movie
const btnAdicionar = document.getElementById('btnAdicionar').addEventListener('click', function addMovie() {
    var titulo = document.getElementById('titulo');
    var descricao = document.getElementById('desc');
    var capa = document.getElementById('url');
    var select = selectedGenero.selectedIndex;
    var movieGenero = "";
    var encerrar = 0;
    if (!titulo.value || !descricao.value || !capa.value || select < 0) {
        erro.innerText = "Por favor preencha os campos e selecione/crie uma genero";
    } else {
        
        if(moviesDados.length > 0) {
            var index = 0;
            for (var i = 0; i < moviesDados.length; i++) {
                if(moviesDados[i].genero == selectedGenero.options[select].text){
                    moviesDados[i].movie.forEach(() => {
                        if (moviesDados[select].movie[index].title == titulo.value) {
                            encerrar = 1;
                            
                        }
                        index++;
                    })
                }
                
            }
        }
        if (encerrar == 0) {
            erro.innerText = "";
            var botao = "";
            movieGenero = selectedGenero.options[select].text;
            if (genero.length >= 0) {
                for (var i = 0; i < genero.length; i++) {
                    const btnMovie = document.getElementsByClassName('btnsGenero');
                    botao = document.getElementById(btnMovie[i].value);

                }
                movies.adicionarMovie(titulo, descricao, capa, movieGenero, genero, btnsGenero, containerMovie, moviesDados, botao.value);
            }
            if (genero.length >= 0) {
                for (var i = 0; i < genero.length; i++) {
                    const btnMovie = document.getElementsByClassName('btnsGenero');
                    const botao = document.getElementById(btnMovie[i].value);
                    botao.addEventListener('click', function () {
                        movies.exibirMovieGenero(containerMovie, botao.value, moviesDados, genero);
                    });
                }
            }
        }else{
            erro.innerText = "Titulo já adicionado";
        }


    }
    
})



