var theme

export async function checkTheme(){ // verificar o tema selecionado pelo usuário
    const radioThemePokemon = document.getElementById("pokemon")
    const radioThemeRickMorty = document.getElementById("rickmorty")
    const subtitleTheme = document.querySelector('.theme')

    if(radioThemePokemon.checked){
        theme = false
        subtitleTheme.innerText = "Pokémon"
        var url = 'https://pokeapi.co/api/v2/pokemon?limit=50'
        return url
    }else if(radioThemeRickMorty.checked){
        theme = true
        subtitleTheme.innerText = "Rick and Morty"
        var url = 'https://rickandmortyapi.com/api/character/?page=2'
        return url
    }
}

export function themeStyle(){
    return theme
}