import { acessUrl as api } from "./api.js"

const listPokemonElement = document.querySelector('.container-cards ul')
const closeList = document.querySelector(".close-list")
const inputSearchPokemon = document.getElementById('searchPokemon')
const modal = document.querySelector('.container-modal-list')
const listType = document.querySelector(".types")
const lists = document.querySelectorAll(".list-menu li")
const details = document.querySelector('.details')

var height
var weight
var species
var abilitys
var stats
var typeClass

closeList.addEventListener("click",() =>{ showModalList(false) })

inputSearchPokemon.addEventListener('input', ()=>{searchPokemon(inputSearchPokemon.value)})

export function showModal(show, containerLetters){
    const modal = document.querySelector('.container-modal')
    if(show){
        if(containerLetters.classList.contains('active-complet-name')){
            modal.style.display = 'flex'
        }
    }else{
        modal.style.display = 'none'
    }
    
}

export function checkSubmitCompletName(pokeName){
    const namePokemon = document.getElementById('name-pokemon').value

    if(namePokemon == pokeName){
        return true
    }
    
    return false
  
}

export function showModalList(value){
    
    if(value){
        listPokemonElement.innerHTML = ''
        modal.style.visibility = "visible"
        modal.children[0].classList.add("modal-visible")
        onloadListPokemons()
    }else{
        modal.style.visibility = 'hidden'
        modal.children[0].classList.remove("modal-visible")
        modal.children[1].lastElementChild.style.width = '0px'
        modal.children[1].children[0].children[1].style.opacity = '0'
        listType.innerHTML = ''
    }
    addEventMenus()
}


function createElementPokemon(pokemon, index){
    const element = document.createElement('li')
    const elementImg = document.createElement('img')
    const elementSpan = document.createElement('span')
    const elementDiv = document.createElement("div")
    elementDiv.className = `card`
    
    elementImg.setAttribute('src', `${pokemon.image}`)
    elementImg.setAttribute('alt', `${pokemon.name}`)

    elementSpan.textContent = pokemon.name

    element.appendChild(elementDiv)
    element.setAttribute("data-index", index)
    element.setAttribute("data-url", pokemon.url)
    element.addEventListener("click", ()=>{showModalPokemon(elementDiv, pokemon.type, elementSpan, pokemon.image)})
    elementDiv.appendChild(elementImg)
    elementDiv.appendChild(elementSpan)
    listPokemonElement.appendChild(element)
    
}


function onloadListPokemons(){
    var index = 0
    var pokemons = JSON.parse(localStorage.getItem('Pokémons'))
    if(pokemons != null){
        pokemons.forEach(pokemon => {
            createElementPokemon(pokemon, index)
            index += 1
        });
    }
   
}

async function showModalPokemon(element, type, span, image){
    const indexElement = element.parentElement.attributes[0]
    const modalDetailsPokemon = modal.children[1].lastElementChild
    const img = document.getElementById('img-pokemon-capture')
    const menuActive = document.querySelector(".active-menu")

    listType.innerHTML = ""
    img.src = image

    element.classList.add(type)
    span.style.color = 'white'
    modalDetailsPokemon.style.width = '40vw'
    modalDetailsPokemon.children[1].style.opacity = '1' 

    if(modalDetailsPokemon.classList.length > 1){
        var classStyle = modalDetailsPokemon.classList[1]
        modalDetailsPokemon.classList.remove(classStyle)
    }

    modalDetailsPokemon.classList.add(type)
    typeClass = type
    checkElementsCardClass(indexElement)

    await searchDetailsPokemon(element, listType)
    await checkAddDetailsShow(menuActive.classList[0])

    
}

function checkElementsCardClass(index){
    const elements = document.querySelectorAll(".card")
    elements.forEach((element) =>{
        if(element.parentElement.attributes[0] != index){
            if(element.classList.length > 1){
                element.classList.forEach((classStyle) =>{
                    if(classStyle != 'card'){
                        element.classList.remove(classStyle)
                        element.lastChild.style.color = 'black'
                    }
                })
            }
        }
        
    })
}

function searchPokemon(value){
    var listCard = document.querySelectorAll('.card')
    listCard.forEach((card) =>{
        if(card.lastChild.textContent.includes(value)){
            card.parentElement.style.display = 'flex'
        }else{
            card.parentElement.style.display = 'none'
        }
    })
}

async function searchDetailsPokemon(element, listType){
    
    var searchUrl = element.parentElement.attributes[1]
    var url = searchUrl.nodeValue

    var detailsPokemon = await api(url, false)
    height = detailsPokemon.height
    weight = detailsPokemon.weight
    species = detailsPokemon.species.name
    abilitys = detailsPokemon.abilities
    stats = detailsPokemon.stats

    var types = detailsPokemon.types
    
    types.forEach((type) =>{
        listType.innerHTML += `<li class="type ${type.type.name}"> ${type.type.name}</li>`
    })
}

function checkMenus(classStyle){
    lists.forEach((menu) =>{
        if(menu.classList[0] != classStyle && menu.classList.length > 1 ){
            var style = menu.classList[1]
            menu.classList.remove(style)
        }else if(menu.classList[0] == classStyle && (menu.classList.length == 1 || menu.classList[1] != 'active-menu')){
            menu.classList.add('active-menu')
        }
    })
}

function addEventMenus(){
    lists.forEach((menu) =>{
        menu.addEventListener('click', () =>{
            checkMenus(menu.classList[0])
            checkAddDetailsShow(menu.classList[0])
        }) 
    })
}


function checkAddDetailsShow(menu){
    switch(menu){
        case 'menu-about':
            showDetailsAbout()
            break
        case 'menu-stats':
            showDetailsStatus();
            break
        default:
            details.innerHTML = ""
            break
    }
}

function showDetailsAbout(){
    details.innerHTML = `<ul class="about">
                            <li>Espécie: <span>${species}</span></li>
                            <li>Habilidades: <span>${(abilitys.map(ability => ability.ability.name)).join(' , ')}</span></li>
                            <li>Altura: <span>${height / 10}</span></li>
                            <li>Largura: <span>${weight / 10}</span></li>
                        </ul>`
}

function showDetailsStatus(){
    details.innerHTML = `<ul class="stats">
                            <li><div>HP: <span>${stats[0].base_stat}</span></div> <div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[0].base_stat / 3}%"></div></div></li>
                            <li><div>Ataque: <span>${stats[1].base_stat}</span></div><div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[1].base_stat / 3}%"></div></div></li>
                            <li><div>Defesa: <span>${stats[2].base_stat}</span></div><div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[2].base_stat / 3}%"></div></div></li>
                            <li><div>Ataque Especial: <span>${stats[3].base_stat}</span></div><div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[3].base_stat / 3}%"></div></div></li>
                            <li><div>Defesa Especial: <span>${stats[4].base_stat}</span></div><div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[4].base_stat / 3}%"></div></div></li>
                            <li><div>Speed: <span>${stats[5].base_stat}</span></div><div class="container-bar"><div class="bar ${typeClass}" style="width: ${stats[5].base_stat / 3}%"></div></div>
                        </ul>`
}