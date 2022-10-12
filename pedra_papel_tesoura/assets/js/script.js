const btnJogar = document.getElementById("btnJogar")
const containerJogador = document.getElementById('container-jogador')
const containerMaquina = document.getElementById('container-maquina')
const spanJogador = document.getElementById('pontoJogador')
const spanMaquina = document.getElementById('pontoMaquina')
const containerGanhador = document.getElementById('ganhador')
// 0 -papel
// 1 - pedra
// 2 - tesoura

var pontuacaoJogador = 0;
var pontuacaoMaquina = 0;

var jogadas = [
    [ 0, '1', "Maquina"],
    [ 0, '2', "Jogador"],
    [ 0, '0', 'Empate'],
    [ 1, '0', 'Jogador'],
    [ 1, '1', 'Empate'],
    [ 1, '2', "Maquina"],
    [ 2, '0', 'Maquina'], 
    [ 2, '2', "Empate"],
    [ 2, '1', "Jogador"]
]


btnJogar.addEventListener('click', () => {
    var maquina = Math.floor(Math.random() * 3)
    switch (maquina){
        case 0:
            containerMaquina.innerHTML = '<i class="fa-solid fa-hand-paper"></i>'
        break;
        case 1:
            containerMaquina.innerHTML = '<i class="fa-solid fa-hand-rock"></i>'
        break;
        case 2:
            containerMaquina.innerHTML = '<i class="fa-solid fa-hand-scissors"></i>'
        break;
        default:
            containerMaquina.innerHTML = ""
        break;

    }
    
    const pedra = document.getElementById('pedra')
    const papel = document.getElementById('papel')
    const tesoura = document.getElementById('tesoura')

    if(pedra.checked){ 
        containerJogador.innerHTML = '<i class="fa-solid fa-hand-rock"></i>'
       ganhador(pedra.value, maquina);
    }else if(papel.checked){
        containerJogador.innerHTML = '<i class="fa-solid fa-hand-paper"></i>'
        ganhador(papel.value, maquina);
    }else if(tesoura.checked){
        containerJogador.innerHTML = '<i class="fa-solid fa-hand-scissors"></i>'
        ganhador(tesoura.value, maquina);
    }
})

function ganhador(jogador, maquina){
    for(var index = 0; index < jogadas.length; index++){
        if(jogadas[index].includes(jogador, 1)){
            if(jogadas[index].includes(maquina, 0)){
                if(jogadas[index][2] == 'Jogador'){
                    containerGanhador.innerText = jogadas[index][2]
                    pontuacaoJogador = pontuacaoJogador + 1;
                    spanJogador.innerText = pontuacaoJogador;
                }else if(jogadas[index][2] == 'Maquina'){
                    containerGanhador.innerText = jogadas[index][2]
                    pontuacaoMaquina = pontuacaoMaquina + 1;
                    spanMaquina.innerText = pontuacaoMaquina;
                }else{
                    containerGanhador.innerText = jogadas[index][2]
                }
            }
        }
    }
}