const modal = document.querySelector('.container-modal-list')
const listPokemonElement = document.querySelector('.container-cards ul')

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
        modal.lastElementChild.classList.add("modal-visible") 
        onloadListPokemons()
    }else{
        modal.style.visibility = 'hidden'
        modal.lastElementChild.classList.remove("modal-visible")
    }
    
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
    element.addEventListener("click", ()=>{showModalPokemon(elementDiv, pokemon.type, elementSpan)})
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

function showModalPokemon(element, type, span){
    const indexElement = element.parentElement.attributes[0]
    element.classList.add(type)
    span.style.color = 'white'
    checkElementsCardClass(indexElement)
    
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