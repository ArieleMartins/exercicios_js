
var igual = 0;
export function criandoCategoria(alerta, nomeCategoria,categoria, selectCategorias, listaCategorias) {
    for (var i = 0; i < categoria.length; i++) {
        if(nomeCategoria.value == categoria[i]){
            igual = 1;
        }
    }
    if (igual == 0) {
        alerta.innerText = "";
        console.log(igual + categoria)
        categoria.push(nomeCategoria.value);
        var index = categoria.indexOf(nomeCategoria.value);
        selectCategorias.innerHTML += '<option value="' + categoria[index] + '">' + categoria[index] + '</option>';
        listaCategorias.innerHTML += '<option value=" ' + categoria[index] + '">' + categoria[index] + '</option>';
        nomeCategoria.value =  "";
    }else{
        alerta.innerText = "Essa categoria já foi adicionada";
        igual = 0;
    } 
}
export function removendoCategoria(indexCategoria, options, selectCategorias, categoria, listaCategoria){
    
    selectCategorias.removeChild(options[indexCategoria]);
    categoria.splice(indexCategoria, 1);
    listaCategorias.innerHTML = '';
    for (var i = 0; i < categoria.length; i++) {
        listaCategorias.innerHTML += '<option value="' + categoria[i] + '">'+ categoria[i] +'</option>';
    }

}