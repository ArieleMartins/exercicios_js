var caixa = document.getElementById('caixa');
var cb = 5;
var er = 5;
document.onkeydown = function test(event){
    
    console.log(event.key);
    if(event.key == 'ArrowUp'){
        caixa.style.bottom = cb + 'px';
        cb = cb + 5;
        console.log(cb);
    }else if(event.key == 'ArrowDown'){
        cb = cb - 5;
        caixa.style.bottom = cb + 'px';
        console.log(cb);
    }else if(event.key == "ArrowRight"){
        caixa.style.left = er + 'px';
        er = er + 5;
    }else if(event.key == "ArrowLeft"){
        er = er - 5;
        caixa.style.left = er + 'px';
    }
    
}
document.onkeyup = function test(event){
    if(event.key == 'ArrowUp'){
        caixa.style.bottom = cb + 'px';
        cb = cb + 5;
        console.log(cb);
    }else if(event.key == 'ArrowDown'){
        cb = cb - 5;
        caixa.style.bottom = cb + 'px';
        console.log(cb);
    }else if(event.key == "ArrowRight"){
        caixa.style.left = er + 'px';
        er = er + 5;
    }else if(event.key == "ArrowLeft"){
        er = er - 5;
        caixa.style.left = er + 'px';
    }
}