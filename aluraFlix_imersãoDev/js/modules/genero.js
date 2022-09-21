
var igual = 0;
export function criandoGenero(alerta, nomeGenero, genero, selectGeneros, listaGeneros, btnsGenero) {
    btnsGenero.innerHTML = "";
    for (var i = 0; i < genero.length; i++) {
        if (nomeGenero.value == genero[i]) {
            igual = 1;
        }
    }
    if (igual == 0) {
        alerta.innerText = "";
        genero.push(nomeGenero.value);
        var index = genero.indexOf(nomeGenero.value);
        selectGeneros.innerHTML += '<option value="' + genero[index] + '">' + genero[index] + '</option>';
        listaGeneros.innerHTML += '<option value=" ' + genero[index] + '">' + genero[index] + '</option>';
        nomeGenero.value = "";

    } else {
        alerta.innerText = "Essa genero já foi adicionada";
        igual = 0;
    }
    for (var i = 0; i < genero.length; i++) {
        btnsGenero.innerHTML += '<div style="width:150px"><button id="' + genero[i] + '" value="' + genero[i] + '" class="btnsGenero">' + genero[i] + '</button></div>';
    }
}
export function removendoGenero(indexGenero, options, selectGeneros, genero, listaGenero, btnsGenero, containerMovie, movies) {
    btnsGenero.innerHTML = "";
    var ge = options[indexGenero];
    selectGeneros.removeChild(options[indexGenero]);
    genero.splice(indexGenero, 1);
    listaGenero.innerHTML = '';
    for (var i = 0; i < genero.length; i++) {
        listaGenero.innerHTML += '<option value="' + genero[i] + '">' + genero[i] + '</option>';
    }
    for (var i = 0; i < genero.length; i++) {
        btnsGenero.innerHTML += '<div style="width:150px"><button id="' + genero[i] + '" value="' + genero[i] + '" class="btnsGenero">' + genero[i] + '</button></div>';
    }
    containerMovie.innerHTML = "";
        if (movies.length >= 0) {
            for (var j = 0; j < movies.length; j++) {
                if (ge.value == movies[j].genero) {
                    movies.splice(j, 1);
                    j--;
                }
            }
        }
        
}