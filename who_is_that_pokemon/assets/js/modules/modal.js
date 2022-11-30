export function checkSubmitCompletName(pokeName){
    const namePokemon = document.getElementById('name-pokemon').value
    if(namePokemon == pokeName){
        return true
    }

    return false
}