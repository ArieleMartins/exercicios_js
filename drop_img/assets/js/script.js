const button = document.getElementById('adicionar') // responsavel por fazer o click no input
const dropImg = document.getElementById('drop-img') // responsavel por receber a imagem que é solta
const input = document.getElementById('arquivos') // responsavel por receber o arquivo
const erro = document.getElementById('error') // responsavel por avisar ao usuario que o tipo de arquivo não foi  aceito
const exibir = document.getElementById('files') // exibir os arquivos enviados

var tipos = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'] // para verificar os tipos de arquivos

button.addEventListener("click", function (){ // ao clicar no botão, execute o evento click no input do type file
    input.click()
})

dropImg.addEventListener('dragover', (e) => { // quando o mouse o arquivo entrar execute
    e.preventDefault(); // remover um evento padrão
    dropImg.style.backgroundColor = 'rgb(185, 185, 255)'; // mudar a cor do background
})

dropImg.addEventListener('dragleave', (e) => { // quando o mouse com o arquivo sair execute
    e.preventDefault();
    dropImg.style.backgroundColor = 'white';
})

dropImg.addEventListener('drop', (e) =>{ // quando o arquivo for solto execute
    e.preventDefault();
    dropImg.style.backgroundColor = 'white';
    var dados = e.dataTransfer
    var imgs = dados.files // pegue os arquivos tranferido e passe para a variavel
    for (var file of imgs){
        if(tipos.includes(file.type)){
            erro.innerText = ''
            exibirArquivo(file);
        }else{
            erro.style.color = 'red';
            erro.innerText = 'Tipo de arquivo não permitido'
        }
    }
})

input.addEventListener('change', function (){ // execute a cada mudaça que houver no input
    var imgs = this.files; // passe para a variavel todos os arquivos deste input
    for (const file of imgs){ // percorra cada dados que se encontra na variavel imgs e coloque o dado na variavel file
        if(tipos.includes(file.type)){ // se o tipo de arquivo estiver incluso na variavel tipos execute. Ele irá percorre todos os dados que a variavel tipos tem e comparar com tipo do arquivo
            erro.innerText = ''
            exibirArquivo(file); // chamar e mandar o arquivo para a função
        }else{ // se o tiṕ de arquivo não é encontrado na variavel tipos execute
            erro.style.color = 'red'; // mudando a cor das letras para vermelho
            erro.innerText = 'Tipo de arquivo não permitido'// adicionando texto a tag span
        }
    }
})


function exibirArquivo(file){ // recebendo e arquivo no parametro
    const reader = new FileReader() // para ler arquivos assincronamente
    reader.onload = (e) =>{ // no carregando crie as tags no html e passe os dados - e.target.result = url da imagem - file.name = nome da imagem
        exibir.innerHTML += `
                        <div>
                            <div style="display:flex; align-items:center">
                                <img style="max-width:80px" src='${e.target.result}' alt='${file.name}'>
                                <span>${file.name}</span>
                            </div>
                        </div>
                            `
    }
    reader.readAsDataURL(file) // para iniciar a leitura
}
