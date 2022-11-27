export async function acessUrl(){
    try{
        var url = `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 899)}/`
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

