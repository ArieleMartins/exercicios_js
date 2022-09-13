export function adicionarMovie(titulo, descricao, capa, movieCategoria, btnsCategoria, containerMovie){
    btnsCategoria.innerHTML += '<button id="'+ movieCategoria +'" value="' + movieCategoria + '" class="btnsCategoria">' + movieCategoria + '</button>';
    const button = document.getElementsByClassName("btnsCategoria");
    
}