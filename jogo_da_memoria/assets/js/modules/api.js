var urls 
export async function acessUrl(url, urlImages, theme){ // metodo para acessar as urls
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        
        if(theme){
            for (const data of dataJson.results){
                await urlImages.push(data.image)
            }
        }else{
            urls = urlImages
            for (const data of dataJson.results){
                await acessUrlPokemon(data.url)
            }      
        }
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }

    return urlImages
}

async function acessUrlPokemon(url){ // acessar as urls que a url do pokemon passa
    try{
        const response = await fetch(url)
        const dataJson = await response.json()
        await urls.push(dataJson.sprites.front_default)
    }
    catch (e){
        console.log('Opa.. Deu erro')
    }
}
