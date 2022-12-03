
var url
var img
var json
var name
var typePokemon

export async function acessUrl(url, random){
    try{
        json = await fetch(url).then(response => response.json())
        img = await json.sprites.front_default
        name = await json.name
        typePokemon = await json.types[0].type.name
        await equalsPokemon()
        if(random){
            return {
                img,
                name,
                url,
                typePokemon
            } 
        }

        return json
        
    }catch (error){
        console.log("Opa.. deu erro " + error)
    }
}

function checkEqualPokemon(json){
    var getPokemons = JSON.parse(localStorage.getItem('Pokémons'))
    if(getPokemons != null){
        var equals = getPokemons.map(object =>{
            if(object.name == json.name){
                return true
            }
            return false
        })
    
       if(equals.includes(true)){
            return true
       }

       return false
    }
    
}

async function equalsPokemon(){
    while(await checkEqualPokemon(json)){
        url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 899)}/`
        json = await fetch(url).then(response => response.json())
        img = await json.sprites.front_default
        name = await json.name
        typePokemon = await json.types[0].type.name
    }
}


export async function acessUrlPokemonRandom(){
    url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 899)}/`
    const result = await acessUrl(url, true)

    return result
}