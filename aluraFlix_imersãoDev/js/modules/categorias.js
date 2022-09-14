
var igual = 0;
export function criandoCategoria(alerta, nomeCategoria,categoria, selectCategorias, listaCategorias, btnsCategoria) {
    btnsCategoria.innerHTML = "";
    for (var i = 0; i < categoria.length; i++) {
        if(nomeCategoria.value == categoria[i]){
            igual = 1;
        }
    }
    if (igual == 0) {
        alerta.innerText = "";
        categoria.push(nomeCategoria.value);
        var index = categoria.indexOf(nomeCategoria.value);
        selectCategorias.innerHTML += '<option value="' + categoria[index] + '">' + categoria[index] + '</option>';
        listaCategorias.innerHTML += '<option value=" ' + categoria[index] + '">' + categoria[index] + '</option>';
        nomeCategoria.value =  "";
        
    }else{
        alerta.innerText = "Essa categoria já foi adicionada";
        igual = 0;
    }
    for (var i = 0; i < categoria.length; i++) {
        btnsCategoria.innerHTML += '<div style="width:150px"><button id="'+ categoria[i] + '" value="' + categoria[i] + '" class="btnsCategoria">' + categoria[i] + '</button></div>';
    }
}
export function removendoCategoria(indexCategoria, options, selectCategorias, categoria, listaCategoria, btnsCategoria){
    btnsCategoria.innerHTML = "";
    selectCategorias.removeChild(options[indexCategoria]);
    categoria.splice(indexCategoria, 1);
    listaCategoria.innerHTML = '';
    for (var i = 0; i < categoria.length; i++) {
        listaCategoria.innerHTML += '<option value="' + categoria[i] + '">'+ categoria[i] +'</option>';
    }
    for (var i = 0; i < categoria.length; i++) {
        btnsCategoria.innerHTML += '<div style="width:150px"><button id="'+ categoria[i] + '" value="' + categoria[i] + '" class="btnsCategoria">' + categoria[i] + '</button></div>';
    }

}