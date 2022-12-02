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

modal.addEventListener('click', ()=>{
    showModalList(false)
})

function createElementPokemon(pokemon){
    const element = document.createElement('li')
    const elementImg = document.createElement('img')
    const elementSpan = document.createElement('span')

    element.className = `card ${pokemon.type}`
    
    elementImg.setAttribute('src', `${pokemon.image}`)
    elementImg.setAttribute('alt', `${pokemon.name}`)
    elementSpan.textContent = pokemon.name

    element.appendChild(elementImg)
    element.appendChild(elementSpan)
    listPokemonElement.appendChild(element)
}


function onloadListPokemons(){
    var pokemons = JSON.parse(localStorage.getItem('Pokémons'))
    if(pokemons != null){
        pokemons.forEach(pokemon => {
            createElementPokemon(pokemon)
        });
    }
   
}
