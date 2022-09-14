var igual = 0;
var movies = [];
var id = 1;
export function adicionarMovie(titulo, descricao, capa, movieCategoria, categoria, btnsCategoria, containerMovie) {
    igual = 0;
    containerMovie.innerHTML = "";
    for (var i = 0; i < categoria.length; i++) {
        if (categoria[i].value == movieCategoria) {
            igual = 1;
            movies[i].movie.push({ title: titulo, desc: descricao, img: capa, id: id });
            id++;
        }
    }
    if (igual == 0) {
        btnsCategoria.innerHTML = "";
        movies.push({ category: movieCategoria, movie: [{ title: titulo, desc: descricao, img: capa, id: id }] });
        for (var i = 0; i < categoria.length; i++) {
            btnsCategoria.innerHTML += '<div style="width:150px"><button id="' + categoria[i] + '" value="' + categoria[i] + '" class="btnsCategoria">' + categoria[i] + '</button></div>';

        }
        id++;
    }
    if (movies.length > 0) {
    
        for (var j = 0; j < movies.length; j++) {
            if(movieCategoria  == movies[j].category){
                movies[j].movie.forEach(() => {
                    containerMovie.innerHTML += `<div class="container-capa">  
                                                <img src="${movies[j].movie[0].img}" alt="${movies[j].movie[0].title}">
                                                <div class="container-desc">
                                                    <div style="float:right;color:white;cursor:pointer"><span id="${movies[j].movie[0].id}" >&times;</span></div>
                                                    <h4>${movies[j].movie[0].title}</h4>
                                                    <p>${movies[j].movie[0].desc}</p>
                                                </div>
                                            </div>`
    
                })
            }
            
        }
    }
    deleteMovie(categoria);
}

export function exibirMovieCategoria(containerMovie, value, categoria) {
    containerMovie.innerHTML = "";
    for (var i = 0; i < movies.length; i++) {
        if (value == movies[i].category) {
            movies[i].movie.forEach(() => {
                containerMovie.innerHTML += `<div class="container-capa">  
                                                <img src="${movies[i].movie[0].img}" alt="${movies[i].movie[0].title}">
                                                <div class="container-desc">
                                                    <div style="float:right;color:white;cursor:pointer"><span id="${movies[i].movie[0].id}" >&times;</span></div>
                                                    <h4>${movies[i].movie[0].title}</h4>
                                                    <p>${movies[i].movie[0].desc}</p>
                                                </div>
                                            </div>`

            })
        }

    }
    deleteMovie(categoria);
}

export function deleteMovie(cat) {
    if (cat.length >= 0) {

        for (var i = 0; i < cat.length; i++) {
            if (movies.length >= 0) {

                for (var j = 0; j < movies.length; j++) {
                    if (cat[i] == movies[j].category) {
                        movies[j].movie.forEach(() => {
                            const deleteMovie = document.getElementById(movies[j].movie[0].id);
                            if(deleteMovie != null){
                                
                            deleteMovie.addEventListener('click', function () {
                                console.log('foi')
                            })
                            }
                            
                        })
                    }
                }
            }
        }
    }
}