var urls 
var namesCharacters = []

export async function acessUrl(url, urlImages, theme){ 
    namesCharacters = []// metodo para acessar as urls
    try{
        const response = await fetch(url)
        const dataJson = await response.json()

        if(theme){
            for (const data of dataJson.results){
                await urlImages.push(data.image)
                await namesCharacters.push({'name':data.name, 'image': data.image})
            }
        }else{
            urls = urlImages
            for (const data of dataJson.results){
                await acessUrlPokemon(data.url, data.name)
                
            }      
        }
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
    
    return urlImages
}

async function acessUrlPokemon(url, name){ // acessar as urls que a url do pokemon passa
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        await urls.push(dataJson.sprites.front_default)
        await namesCharacters.push({'name': name, 'image': dataJson.sprites.front_default})
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
}

export function returnNamesCharacters(){
    return namesCharacters
}
