const containerProjects = document.querySelector('.container-projects')
const next = document.getElementById('next')
const previous = document.getElementById('previous')
const conteudo = [
    {
        img: 'https://user-images.githubusercontent.com/83427685/202779147-a6b712ec-4904-4fb1-b852-3dcfa93a111f.png',
        alt: 'Projeto AluraFlix - Desenvolvido durante a imersão dev da Alura',
        desc: {name: 'AluraFlix', desc: 'Projeto feito durante a imersão dev Alura. Site onde você pode adicionar capas de seus filmes/séries/hqs favoritos e separa-los por genêro.'},
        href: 'https://arielemartins.github.io/exercicios_js/aluraFlix_imers%C3%A3oDev/"',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/aluraFlix_imers%C3%A3oDev'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202924047-ae86e060-ca27-43b6-8cdc-91b453f6103c.png',
        alt: 'Jogo da Memória',
        desc: {name: 'Jogo da Memória', desc: 'Jogo da memória utilizando api Rick and Morty e Pokemon para os temas das cartas'},
        href: 'https://arielemartins.github.io/exercicios_js/jogo_da_memoria/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/jogo_da_memoria'
    },
    {
        img: 'https://user-images.githubusercontent.com/83427685/202807366-e4281a64-66fd-4dbd-be74-f3a998d12204.png',
        alt: 'Projeto WebConversor - Projeto onde possui diversos conversores',
        desc: {name: 'WebConversor', desc: 'Projeto feito durante a imersão dev Alura. Site com diversos conversore, como: Conversor de Moeda (Utilizando API para pegar os valores em tempo real), Temperatura e Ano-luz.'},
        href: 'https://arielemartins.github.io/exercicios_js/conversores/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/conversores'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202779149-a0cd58f6-ffed-4a6c-b3a4-188ff8a611bf.png',
        alt: 'Calculadora Web',
        desc: {name: 'Calculadora Web', desc: 'Projeto onde o usuário pode fazer calculos simples, como: soma, divisão, subtração e multiplicação. O usuário também pode usar as teclas para fazer os calculos'},
        href: 'https://arielemartins.github.io/exercicios_js/calculadora/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/calculadora'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202779152-a649c81c-fae5-4ca5-88ce-d1c3e5f21b21.png',
        alt: 'Calculando Média',
        desc: {name: 'Calculando Média', desc: 'Projeto onde o usuário pode calcular as médias de seus alunos ou participantes, pode adicionar quantos participantes quiser e quantas notas quiser'},
        href: 'https://arielemartins.github.io/exercicios_js/media/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/media'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202779157-fe276f01-8695-4c50-a5ff-a33ea1eefcea.png',
        alt: 'To-Do List',
        desc: {name: 'To-Do List', desc: 'Projeto onde o usuário pode adicionar e remover tarefas, pode buscar e filtrar da feitas e não feitas'},
        href: 'https://arielemartins.github.io/exercicios_js/to-do-list/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/to-do-list'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202779156-1c082795-235e-4cc0-bef2-7ee38d0c0852.png',
        alt: 'Pedra, Papel e Tesoura',
        desc: {name: 'Pedra, Papel e Tesoura', desc: 'Projeto onde o usuário pode se diverti jogando com sua máquina pedra, papel e tesoura'},
        href: 'https://arielemartins.github.io/exercicios_js/pedra_papel_tesoura/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/pedra_papel_tesoura'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202807522-21aaf08d-a9c2-4854-bf63-5fc96b474270.png',
        alt: 'Drop Image',
        desc: {name: 'Drop Image', desc: 'Projeto onde o usuário poderá arrastar e soltar imagens para adicionar no container'},
        href: 'https://arielemartins.github.io/exercicios_js/drop_img/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/drop_img'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202761598-4f2b09c1-e6df-43d6-b342-d0ec5d8532aa.png',
        alt: 'Jogo Adivinhação',
        desc: {name: 'Jogo Adivinhação', desc: 'Projeto onde o usuário tenta adivinhar o número pensando pela máquina'},
        href: 'https://arielemartins.github.io/exercicios_js/jogo_adivinhar/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/jogo_adivinhar'
    },
    {
        img:'https://user-images.githubusercontent.com/83427685/202767058-22c77d63-3056-4348-9ac1-a130194b013a.png',
        alt: 'Contador',
        desc: {name: 'Contador', desc: 'Um simple contador'},
        href: 'https://arielemartins.github.io/exercicios_js/Contador/',
        github: 'https://github.com/ArieleMartins/exercicios_js/tree/master/Contador'
    },
    
]

var slideIndex = 1

window.onload = ()=>{
    conteudo.forEach((element) =>{
        containerProjects.innerHTML += `
        
        <div class="container-project slide">
            <figure class="figure-project">
            <img src="${element.img}"
                    alt="${element.alt}" />
            </figure>
            <div class="details">
                <h3 class="title-project">${element.desc.name}</h3>
                <p class="desc-project">
                        ${element.desc.desc}
                </p>
                <div class="container-links">
                    <div>
                        <a href="${element.href}" target="_blank" class="play"><i class="fa-solid fa-play"></i></a>
                    </div>
                    <a href="${element.github}" target="_blank" class="github"><i
                            class="fa-brands fa-github-alt" title="GitHub"></i></a>
                </div>
            </div>
        </div>
        
        `
    })

   moveSlide(slideIndex)
}

previous.addEventListener('click', ()=>{
    moveSlide(-1)
})

next.addEventListener('click', ()=>{
    moveSlide(1)
})

function moveSlide(slide){

    var slides = document.getElementsByClassName('slide');
    slideIndex = slide + slideIndex;

    for(var index = 0; index < slides.length; index++){
        slides[index].style.display = 'none'
    }
    if(slideIndex < 1){
        slideIndex = slides.length
    }else if(slideIndex > slides.length){
        slideIndex = 1;
    }
    if(slides.length > 0){
        if(slideIndex > 0){
            slides[slideIndex - 1].style.display = 'block'
        }
        
    }
}


