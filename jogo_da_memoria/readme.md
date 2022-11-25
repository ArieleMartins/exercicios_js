<h1 align="center">JOGO DA MEMÓRIA</h1>

> Projeto desenvolvido para treinar lógica de programação, aprender a organizar arquivos, tenta treinar clean code e estudar sobre acessibilidade

<p align="center" style="padding:20px; font-size:16px">Será que você tem uma boa memória?</p>
<p align="center" style="font-size:16px">Link do projeto: <a href="https://arielemartins.github.io/exercicios_js/jogo_da_memoria/" target="_blank">Jogo da Memória</a></p>



<h2 align="center">Iniciando Partida</h2>
<p align="center" style="padding:20px; font-size:16px">Usuário poderá escolher o tema das cartas e qual é a dificuldade que ele quer jogar</p>

![Iniciando_partida](https://user-images.githubusercontent.com/83427685/204045160-a99eaeef-6786-49ca-b6b8-9b31e14153db.png)

<h2 align="center">Som ao virar as cartas</h2>
<p align="center" style="padding:20px; font-size:16px">Usuário poderá escolher se deseja ativar o som, que fala o nome do personagem, ao virar a carta</p>

<div align="center">

![Ativar_som_acessibilidade](https://user-images.githubusercontent.com/83427685/204047672-d824cb85-847f-4bf0-99fc-54ba0e3ee7c8.png)

</div>



<h2 align="center">Dificuldade</h2>
<p align="center" style="padding:20px; font-size:16px">Ao clicar em dificuldade personalizada o usuário poderá colocar a quantidade de tentativas, poderá escolher se quer que tenha um tempo limite e quanto é esse tempo, e a quantidade de cartas</p>

![opcao_personalizar](https://user-images.githubusercontent.com/83427685/203429134-a0fd8e59-e1da-4c30-8276-a574e119cf55.png)

<h2 align="center">Temas</h2>
<p align="center" style="padding:20px; font-size:16px">Usuário poderá escolher o tema Rick and Morty</p>

![tema_rickandmorty](https://user-images.githubusercontent.com/83427685/203429141-cd871af3-21b0-466c-813e-636e110ea766.png)

<p align="center" style="padding:20px; font-size:16px">Ou o tema Pokémon</p>

![tema_pokemon](https://user-images.githubusercontent.com/83427685/203429138-05ce25d7-d373-4f92-8ccb-26b708a4f655.png)

<h1 align="center">FUNÇÕES 🛠 </h1>

- O usuário poderá escolher os temas das cartas
- Poderá escolher a dificuldade do jogo
    - Normal
        - 18 cartas
        - Sem tempo limite
        - Sem quantidade de tentativas
    - Personalizada
        - Poderá escolher a quantidade de cartas: 18, 24, 30, 36
        - Poderá escolher se quer tempo limite e quanto é esse tempo. Vai de 50 segundos até 2 minutos
        - Poderá escolher a quantidade de tentativa, minimo 10 e o maximo é 2 vezes a quantidade de cartas
- Botão de Acessibilidade - Ativar Audio
    - O usuário poderá escolher se quer ativar o audio ao virar a carta

<h1 align="center">O QUE USEI E APRENDI 📖</h1>

- APIS:
    - [Rick and Morty](https://rickandmortyapi.com/documentation/#get-all-characters)
    - [Pokemon](https://pokeapi.co/)
- Import e Export para deixar os arquivos organizados
- getComputerStyle e getProperyValue para verificar se as cartas são iguais
    - Agora foi adicionado tag img para acessibilidade, então é usando o atributo src para comparação
- fetch para usar as apis
- createElement e appendChild para criar as cartas
- setTimeout, setInterval, clearInterval e clearTimeout para fazer o timer e exibir os modais
- SpeechSynthesisUtterance para adicionar som ao virar as cartas

<h1 align="center">TECNOLOGIAS</h1>

- HTML
- CSS
- JAVASCRIPT

<h1 align="center">DESENVOLVEDORES</h1>
<div align="center">
    <img style="border-radius: 50%" height="200em" src="https://github.com/ArieleMartins.png">
    <h2 >Ariele Martins</h2>
</div>