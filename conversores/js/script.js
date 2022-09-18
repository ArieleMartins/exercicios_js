const modal = document.getElementById('modal');
const containerMoeda = document.getElementById('moeda');
const containerTemp = document.getElementById('temperatura');
const containerLuz = document.getElementById('luz');
const close = document.getElementById('close');
const painel = document.getElementById('painel');
const btnIniciar = document.getElementById('btnIniciar');


close.addEventListener('click', function fechar() {
    modal.style.display = "none";
    painel.innerHTML = "";
})

containerLuz.addEventListener('click', function luz() {
    conversorQAL();
});

containerMoeda.addEventListener('click', function moeda() {
    conversorMoeda();
});

containerTemp.addEventListener('click', function temperatura() {
    conversorTemperatura();
});

btnIniciar.addEventListener('click', function selectConversor() {
    modal.style.display = 'flex';
    painel.innerHTML = `<div style="display:flex; flex-direction:column; row-gap:70px">
                            <h1 style="text-transform:uppercase">Selecione o conversor</h1>
                            <div style="display:flex; flex-direction:column; font-size: 20px; row-gap: 20px; width:330px">
                                <div style="diplay:flex; flex-direction:row; column-gap:1vw">
                                    <input type="radio" value="temperatura" name="conversor" id="temp" checked/>
                                    <label for="temperatura">Conversor de Temperatura</label>
                                </div>
                                <div style="diplay:flex; flex-direction:row; column-gap:1vw">
                                    <input type="radio" value="moeda" name="conversor" id="md"/>
                                    <label for="moeda">Conversor de Moeda</label>
                                </div>
                                <div style="diplay:flex; flex-direction:row; column-gap:1vw">
                                    <input type="radio" value="QAL" name="conversor" id="qal"/>
                                    <label for="QAL">Conversor de Quilometro de Ano Luz</label>
                                </div>
                            </div>
                            <div class="container-btn">
                                 <button id="play">PLAY</button>
                            </div>
                        </div>`;
    const temperatura = document.getElementById('temp');
    const moeda = document.getElementById('md');
    const qal = document.getElementById('qal');
    const play = document.getElementById('play');

    play.addEventListener('click', function abrirModalConversor() {
        if (temperatura.checked) {
            conversorTemperatura();
        } else if (moeda.checked) {
            conversorMoeda();
        } else {
            conversorQAL();
        }
    })


});

function conversorTemperatura() {
    modal.style.display = 'flex';
    painel.innerHTML = `<div> 
                            <h1>Conversor de Temperatura</h1>
                            <div class="container-icon-painel">
                                <i class="fa-solid fa-temperature-quarter" class="temp" id="temp"></i>
                            </div>
                            <div style="display:flex; flex-direction:row; column-gap: 20px; width:300px; margin:auto; font-size:18px">
                                <div style="display:flex; flex-direction:row; justify-content:center; column-gap: 1vw;">
                                    <input type="radio" name='convert' id="rbCelsius" checked>
                                    <label for='celsius'>Celsius</label>
                                    
                                </div>
                                <div style="display:flex; flex-direction:row; justify-content:center; column-gap: 1vw;">
                                    <input type="radio" name="convert" id="rbFah" >
                                    <label for="fah">Fahrenheits</label>
                                    
                                </div>
                            </div>
                            <div class="container-inputs">
                                <div class="container-valor">
                                    <label for="celsius">Celsius</label>
                                    <input type="number" id="celsius" >
                                </div>
                                <div class="container-valor-convertido">
                                    <label for="fahrenheits">Fahrenheits</label>
                                    <input type="number" id="fah" disabled>
                                </div>
                            </div>
                            <div  class="container-btn">
                                <button id="btnConvert">Converte</button>
                            </div>
                        </div>`;
    var btnConvert = document.getElementById('btnConvert');
    const fah = document.getElementById('fah');
    const celsius = document.getElementById('celsius');
    const rbCelsius = document.getElementById('rbCelsius');
    const rbFah = document.getElementById('rbFah');
    rbCelsius.addEventListener('click', function () {
        if (rbCelsius.checked) {
            celsius.disabled = false;
            fah.disabled = true;
        }
    })
    rbFah.addEventListener('click', function () {
        if (rbFah.checked) {
            celsius.disabled = true;
            fah.disabled = false;
        }
    })
    btnConvert.addEventListener('click', function Converter() {
        if (rbCelsius.checked) {
            var cel = parseFloat(celsius.value);
            var convert = (cel * 9 / 5) + 32;
            fah.value = convert.toFixed(4);
        }else if(rbFah.checked){
            var fahrenheits = parseFloat(fah.value);
            var convert = (fahrenheits - 32)* 5/ 9;
            celsius.value = convert.toFixed(4);
        }

    });
}

async function conversorMoeda() {
    modal.style.display = "flex";
    listCoins = [];
    const url = 'https://economia.awesomeapi.com.br/json/last/';
    const coins = 'USD-BRL,EUR-BRL,BTC-BRL'

    await fetch(url + coins).then((response) => response.json()).then((dados) => listCoins.push(dados));

    painel.innerHTML = `<div>
                            <h1>Converso de Moedas</h1>
                            <div class="container-icon-painel">
                                <i class="fa-solid fa-coins"></i>
                            </div>
                            <div class="container-inputs">
                                <div class="container-valor">
                                    <label for="real">Valor</label>
                                    <input type="number" id="real" name="real">
                                </div>
                                <div class="container-valor-convertido">
                                    <label>Moeda</label>
                                    <select id="nameCoins">
                                        <option value="USD">${listCoins[0].USDBRL.name}</option>
                                        <option value="EUR">${listCoins[0].EURBRL.name}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="container-btn">
                                <button id="btnConvert">Converter</button>
                            </div>
                            <div class="container-result">
                                <span id="selectValue"></span>
                                <span id="bitcoin"></span>
                            </div>
                        </div>
    `;
    const btnConvert = document.getElementById('btnConvert');
    const spanConvertido = document.getElementById('selectValue');
    const spanBitcoin = document.getElementById('bitcoin');
    const select = document.getElementById('nameCoins');
    var selecionado = '';
    var valorConvertido = 0;
    btnConvert.addEventListener('click', function converter() {
        selecionado = select.options[select.selectedIndex].value;
        var real = parseFloat(document.getElementById('real').value);
        if (!real) {
            spanConvertido.innerText = "Por favor adicione algum valor";
            spanBitcoin.innerText = "";
        } else {
            switch (selecionado) {
                case "EUR":
                    valorConvertido = real * listCoins[0].EURBRL.bid;
                    break;
                case "USD":
                    valorConvertido = real * listCoins[0].USDBRL.bid;
                    break;
                default:
                    spanConvertido.innerText = "Por favor selecione algum valor";
                    spanBitcoin.innerText = "";
                    break;
            }
            var bitcon = real * listCoins[0].BTCBRL.bid;
            spanConvertido.innerText = `O valor em real é R$ ${valorConvertido.toFixed(2)}`;
            spanBitcoin.innerText = `O valor em bitcon é ${bitcon.toFixed(2)}`;
        }
    })
}

function conversorQAL() {
    modal.style.display = 'flex';
    painel.innerHTML = `<div>
                            <h1>Conversor de Ano Luz</h1>
                            <div class="container-icon-painel">
                                <i class="fa-solid fa-ruler-horizontal"></i>
                            </div>
                            <div style="display:flex; flex-direction:row; column-gap: 20px; width:300px; margin:auto; font-size:18px">
                                <div style="display:flex; flex-direction:row; justify-content:center; column-gap: 1vw;">
                                    <input type="radio" name='convert' id="rbQm" checked>
                                    <label for='metro'>Quilometros</label>
                                    
                                </div>
                                <div style="display:flex; flex-direction:row; justify-content:center; column-gap: 1vw;">
                                    <input type="radio" name="convert" id="rbAno" >
                                    <label for="anoluz">Ano Luz</label>
                                    
                                </div>
                            </div>
                            <div class="container-inputs">
                                <div class="container-valor">
                                    <label for='metro'>Quilometros</label>
                                    <input type="number" name='metro' id="valor">
                                </div>
                                <div class="container-valor-convertido">
                                    <label for="anoluz">Ano Luz</label>
                                    <input type="number" name="anoluz" id="valorano" disabled>
                                </div>
                            </div>
                            <div class="container-btn">
                                <button id="convert">Converter</button>
                            </div>
                        </div>`;

    const anoluz = document.getElementById('valorano');
    const convert = document.getElementById('convert');
    const rbQm = document.getElementById('rbQm');
    const rbAno = document.getElementById('rbAno');
    const quilometro = document.getElementById('valor')
    rbQm.addEventListener('click', function () {
        if (rbQm.checked == true) {
            anoluz.disabled = true;
            quilometro.disabled = false;
        }
    })
    rbAno.addEventListener('click', function () {
        if (rbAno.checked == true) {
            anoluz.disabled = false;
            quilometro.disabled = true;
        }
    })
    convert.addEventListener('click', function converteMetroAno() {
        if (rbQm.checked) {
            const valor = parseFloat(quilometro.value);
            var convertido = valor / 0.9461;
            anoluz.value = convertido.toFixed(4);
        } else if (rbAno.checked) {
            const valor = parseFloat(anoluz.value);
            var convertido = 0.9461 * valor;
            quilometro.value = convertido.toPrecision();
        }

    });
}