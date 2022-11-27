export async function acessUrl(number){
    try{
        const url = `https://pokeapi.co/api/v2/pokemon/${number}/`
        const json = await fetch(url).then(response => response.json())
        const img = await json.sprites.front_default
        const name = await json.name
        return {
            img,
            name
        }
    }catch (error){
        console.log("Opa.. deu erro " + error)
    }
}

