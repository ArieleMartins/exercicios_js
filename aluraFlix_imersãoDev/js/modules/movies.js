var ident = 0;
var id = 0;
export function adicionarMovie(titulo, descricao, capa, movieGenero, genero, btnsGenero, containerMovie, movies, value) {

    containerMovie.innerHTML = "";
    var index = -1;
    if (movies.length > 0) {
        for (var i = 0; i < movies.length; i++) {
            index = movies[i].genero.indexOf(movieGenero);
            if (index >= 0) {
                if (movies[i].genero == movieGenero) {
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
            btnsGenero.innerHTML = "";
            movies.push({ identificador: id, genero: movieGenero, movie: [{ title: titulo.value, desc: descricao.value, img: capa.value, id: id }] });
            for (var i = 0; i < genero.length; i++) {
                btnsGenero.innerHTML += '<div style="width:150px"><button id="' + genero[i] + '" value="' + genero[i] + '" class="btnsGenero">' + genero[i] + '</button></div>';

            }
            id++;
        }

    } else {
        btnsGenero.innerHTML = "";
        movies.push({ identificador: id, genero: movieGenero, movie: [{ title: titulo.value, desc: descricao.value, img: capa.value, id: id }] });
        for (var i = 0; i < genero.length; i++) {
            btnsGenero.innerHTML += '<div style="width:150px"><button id="' + genero[i] + '" value="' + genero[i] + '" class="btnsGenero">' + genero[i] + '</button></div>';

        }
        id++;
    }

    if (movies.length > 0) {
        exibirMovieGenero(containerMovie, value, movies, genero);
    }
    titulo.value = "";
    capa.value = "";
    descricao.value = "";
}

export function exibirMovieGenero(containerMovie, value, movies, genero) {
    containerMovie.innerHTML = "";
    var j = 0;
    for (var i = 0; i < movies.length; i++) {
        if (value == movies[i].genero) {
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
    verificarImagem(movies, value);
    adicionarEventoDeleteMovie(genero, movies, containerMovie, value);

}


function verificarImagem(movies, value) {
    if (movies.length > 0) {
        var index = 0;
        for (var i = 0; i < movies.length; i++) {
            movies[i].movie.forEach(() => {
                if (movies[i].genero == value) {
                    const verificarImg = document.getElementById(movies[i].movie[index].title);
                    if (verificarImg != null) {
                        verificarImg.onerror = function () {
                            verificarImg.style.maxWidth = "250px";
                            verificarImg.style.backgroundColor = "rgb(26, 26, 26)";
                            verificarImg.src = "../../imgs/opss-error.svg";
                        }
                        index++;
                    }
                }


            })

        }
    }
}

function adicionarEventoDeleteMovie(genero, movies, containerMovie, value, movieGenero){
    if (genero.length >= 0) {

        for (var i = 0; i < movies.length; i++) {
            if (movies.length >= 0) {
                var z = 0;
                for (var j = 0; j < movies.length; j++) {
                    if (genero[i] == movies[j].genero) {
                        movies[j].movie.forEach(() => {
                            const deleteMovie = document.getElementById(movies[j].movie[z].id);
                            var ident = j;
                            var index = z;
                            if (deleteMovie != null) {

                                deleteMovie.addEventListener('click', function () {
                                    movies[ident].movie.splice(index, 1);
                                    containerMovie.innerHTML = "";
                                    exibirMovieGenero(containerMovie, value, movies, genero, movieGenero);
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