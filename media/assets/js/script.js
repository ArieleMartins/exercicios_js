const btnAddAluno = document.getElementById("btnAdicionarAluno");
const btnAddNota = document.getElementById('btnAddNota');
const btnCalcularMedia = document.getElementById('btnCalcularMedia');
const spanAviso = document.getElementById('aviso');
const selectNomeAlunos = document.getElementById('nomesAlunos');
const containerExibirMedia = document.getElementById('container-dados');

var indexSelect = 0;
var verificarAlunoCadastrado = false;
var alunos = []
var identificadorAluno;

btnAddAluno.addEventListener('click', function () {
    var nome = document.getElementById('nomeAluno');
    console.log(!nome.value);
    if (!nome.value) {
        spanAviso.innerText = "Por favor preencha o campo nome"
    } else {
        spanAviso.innerText = ""
        if (alunos.length > 0) {
            for (var index = 0; index < alunos.length; index++) {
                if (alunos[index].name.toUpperCase() == nome.value.toUpperCase()) {
                    spanAviso.innerText = "Aluno já cadastrado"
                    verificarAlunoCadastrado = true;
                }
            }
            adicionarAlunoSelect(verificarAlunoCadastrado, alunos, nome);
        } else {
            adicionarAlunoSelect(verificarAlunoCadastrado, alunos, nome);

        }

    }
})

btnAddNota.addEventListener('click', function () {
    if (selectNomeAlunos.options[indexSelect] == undefined) {
        spanAviso.innerText = "Por favor adicione um aluno/participante"
    } else {
        var alunoSelecionado = selectNomeAlunos.options[indexSelect].value;
        for(var index = 0; index < alunos.length; index++){
            if(alunos[index].name == alunoSelecionado){
                identificadorAluno = index;
            }
        }
        var nota = document.getElementById('notas');
        if(!nota.value){
            spanAviso.innerText = 'Por favor preencha o campo nota'
        }else{
            if(nota.value > 10 || nota.value < 0){
                spanAviso.innerText = 'Por favor digite uma nota de 0 a 10'
            }else{
                spanAviso.innerText = ''
                alunos[identificadorAluno].grades.push(nota.value)
                nota.value = ''
            }
        }    
    }

})

selectNomeAlunos.addEventListener('change', function () {
    indexSelect = selectNomeAlunos.selectedIndex
})

btnCalcularMedia.addEventListener('click', function(){
    if(alunos.length == 0){
        spanAviso.innerText = "Por favor adicione algum aluno/participante para verificar sua média"
    }else{
        console.log('Estou passando por aqui')
        for(var index = 0; index < alunos.length; index++){
            console.log('Estou passando por aqui')
            somaNotasMedia(alunos[index]);
        }
    }
})

function somaNotasMedia(aluno){
    var somaNotas = 0;
    var media  = 0;
    if(aluno.grades.length > 0){
        for(var index = 0; index < aluno.grades.length; index++){
            somaNotas = parseInt(aluno.grades[index]) + somaNotas;
        }
        media = somaNotas / aluno.grades.length;
        containerExibirMedia.innerHTML += `
                <div>
                    <div class="container-nome-aluno">
                        <h3 id="nome-aluno">${aluno.name}</h3>
                    </div>
                    <div class="container-notas">
                        <div class="container-titulo-notas">
                            <h5>Notas</h5>
                        </div>
                        <div id="notas-aluno-${aluno.name}" class="notas-aluno">
                            
                        </div>
                    </div>
                    <div class="container-total">
                        <p id="total-notas">Total : ${somaNotas}<br>Quantidade de Notas:${aluno.grades.length}</p>
                    </div>
                    <div class="container-media">
                        <div class="container-titulo-media">
                            <h5>Média</h5>
                        </div>

                        <div id="media-aluno">
                            <p>${media}</p>
                        </div>
                    </div>
                </div>

        `
        const exibirNotasAluno = document.getElementById('notas-aluno-' + aluno.name);
        for(var index = 0; index < aluno.grades.length; index++){
            exibirNotasAluno.innerHTML += `<p>${aluno.grades[index]}</p>`
        }
    }else{
        spanAviso.innerHTML = `<p>${aluno.name} não possui notas</p>`
    }
}

function adicionarAlunoSelect(verificador, alunos, nome) {
    if (verificador == false) {
        spanAviso.innerText = "";
        selectNomeAlunos.innerHTML = "";
        alunos.push({ name: nome.value, grades: [], total: 0, avegare: 0 })
        for (var index = 0; index < alunos.length; index++) {
            selectNomeAlunos.innerHTML += `<option value="${alunos[index].name}">${alunos[index].name}</option>`
        }
        nome.value = "";
    } else {
        spanAviso.innerText = "Aluno/Participante Já Cadastrado"
    }
}