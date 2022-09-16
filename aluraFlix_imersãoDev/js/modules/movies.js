var ident = 0;
var id = 0;
export function adicionarMovie(titulo, descricao, capa, movieCategoria, categoria, btnsCategoria, containerMovie, movies, value) {

    containerMovie.innerHTML = "";
    var index = -1;
    if (movies.length > 0) {
        for (var i = 0; i < movies.length; i++) {
            index = movies[i].category.indexOf(movieCategoria);
            if (index >= 0) {
                if (movies[i].category == movieCategoria) {
                    ident = i;
                    break;
                } else {
                    index = -1;
                    break;
                }
            }

        }
        if (index > -1) {
            movies[ident].movie.push({ title: titulo.value, desc: descricao.value, img: capa.value, id: id });
            id++;
        } else {
            btnsCategoria.innerHTML = "";
            movies.push({ identificador: id, category: movieCategoria, movie: [{ title: titulo.value, desc: descricao.value, img: capa.value, id: id }] });
            for (var i = 0; i < categoria.length; i++) {
                btnsCategoria.innerHTML += '<div style="width:150px"><button id="' + categoria[i] + '" value="' + categoria[i] + '" class="btnsCategoria">' + categoria[i] + '</button></div>';

            }
            id++;
        }

    } else {
        btnsCategoria.innerHTML = "";
        movies.push({ identificador: id, category: movieCategoria, movie: [{ title: titulo.value, desc: descricao.value, img: capa.value, id: id }] });
        for (var i = 0; i < categoria.length; i++) {
            btnsCategoria.innerHTML += '<div style="width:150px"><button id="' + categoria[i] + '" value="' + categoria[i] + '" class="btnsCategoria">' + categoria[i] + '</button></div>';

        }
        id++;
    }

    if (movies.length > 0) {
        var i = 0;
        for (var j = 0; j < movies.length; j++) {
            if (movieCategoria == movies[j].category) {
                movies[j].movie.forEach(() => {
                    containerMovie.innerHTML += `<div class="container-capa">  
                                                <img src="${movies[j].movie[i].img}" alt="" id="${movies[j].movie[i].title}">
                                                <div class="container-desc">
                                                    <div style="float:right;color:white;cursor:pointer"><span id="${movies[j].movie[i].id}" >&times;</span></div>
                                                    <h4>${movies[j].movie[i].title}</h4>
                                                    <p>${movies[j].movie[i].desc}</p>
                                                </div>
                                            </div>`
                    i++;
                })
            }

        }

    }
    verificarImagem(movies, movieCategoria);
    if (categoria.length >= 0) {

        for (var i = 0; i < movies.length; i++) {
            if (movies.length >= 0) {
                var z = 0;
                for (var j = 0; j < movies.length; j++) {
                    if (categoria[i] == movies[j].category) {
                        movies[j].movie.forEach(() => {
                            const deleteMovie = document.getElementById(movies[j].movie[z].id);
                            var ident = j;
                            var index = z;
                            if (deleteMovie != null) {

                                deleteMovie.addEventListener('click', function () {
                                    movies[ident].movie.splice(index, 1);
                                    containerMovie.innerHTML = "";
                                    exibirMovieCategoria(containerMovie, value, movies, categoria, movieCategoria);
                                })
                            }
                            z++;
                        })
                    }

                }
            }
        }
    }
    console.log(movies);
    titulo.value = "";
    capa.value = "";
    descricao.value = "";
}

export function exibirMovieCategoria(containerMovie, value, movies, categoria, movieCategoria) {
    containerMovie.innerHTML = "";
    var j = 0;
    for (var i = 0; i < movies.length; i++) {
        if (value == movies[i].category) {
            movies[i].movie.forEach(() => {
                containerMovie.innerHTML += `<div class="container-capa">  
                                                <img src="${movies[i].movie[j].img}" alt="" id="${movies[i].movie[j].title}">
                                                <div class="container-desc">
                                                    <div style="float:right;color:white;cursor:pointer"><span id="${movies[i].movie[j].id}" >&times;</span></div>
                                                    <h4>${movies[i].movie[j].title}</h4>
                                                    <p>${movies[i].movie[j].desc}</p>
                                                </div>
                                            </div>`
                j++;
            })

        }

    }
    verificarImagem(movies, movieCategoria);
    if (categoria.length >= 0) {

        for (var i = 0; i < movies.length; i++) {
            if (movies.length >= 0) {
                var z = 0;
                for (var j = 0; j < movies.length; j++) {
                    if (categoria[i] == movies[j].category) {
                        movies[j].movie.forEach(() => {
                            const deleteMovie = document.getElementById(movies[j].movie[z].id);
                            var ident = j;
                            var index = z;
                            if (deleteMovie != null) {
                                deleteMovie.addEventListener('click', function () {
                                    movies[ident].movie.splice(index, 1);
                                    exibirMovieCategoria(containerMovie, value, movies, categoria);
                                })
                            }
                            z++;
                        })
                    }

                }
            }
        }
    }

}


function verificarImagem(movies, movieCategoria) {
    if (movies.length > 0) {
        var index = 0;
        for (var i = 0; i < movies.length; i++) {
            movies[i].movie.forEach(() => {
                if (movies[i].category == movieCategoria) {
                    const verificarImg = document.getElementById(movies[i].movie[index].title);
                    if (verificarImg != null) {
                        verificarImg.onerror = function () {
                            verificarImg.style.maxWidth = "250px";
                            verificarImg.style.backgroundColor = "rgb(26, 26, 26)";
                            verificarImg.src = "../../imgs/Oops! 404 Error with a broken robot-rafiki.svg";
                        }
                        index++;
                    }
                }


            })

        }
    }
}
