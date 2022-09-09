const modal = document.getElementById('modal');
const containerMoeda = document.getElementById('moeda');
const containerTemp = document.getElementById('temperatura');
const containerLuz = document.getElementById('luz');
const close = document.getElementById('close');
const painel = document.getElementById('painel');

close.addEventListener('click', function fechar() {
    modal.style.display = "none";
    painel.innerHTML = "";
})

containerLuz.addEventListener('click', function luz() {
    modal.style.display = 'flex';
    painel.innerHTML = `<div>
                            <h1>Conversor de Ano Luz</h1>
                            <div class="container-icon-painel">
                                <i class="fa-solid fa-ruler-horizontal"></i>
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

    convert.addEventListener('click', function converteMetroAno() {
        const valor = parseFloat(document.getElementById('valor').value);
        var convertido = valor / 9.461;
        anoluz.value = convertido.toFixed(4);
    });
});

containerMoeda.addEventListener('click', async function moeda() {
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
        console.log(real);
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
});

containerTemp.addEventListener('click', function temperatura() {
    modal.style.display = 'flex';
    painel.innerHTML = `<div> 
                            <h1>Conversor de Temperatura</h1>
                            <div class="container-icon-painel">
                                <i class="fa-solid fa-temperature-quarter" class="temp" id="temp"></i>
                            </div>
                            <div class="container-inputs">
                                <div class="container-valor">
                                    <label for="celsius">Celsius</label>
                                    <input type="number" id="celsius" >
                                </div>
                                <div class="container-valor-convertido">
                                    <label for="fahrenheits">Fagrenheits</label>
                                    <input type="number" id="fah" disabled>
                                </div>
                            </div>
                            <div  class="container-btn">
                                <button id="btnConvert">Converte</button>
                            </div>
                        </div>`;
    var btnConvert = document.getElementById('btnConvert');
    btnConvert.addEventListener('click', function Converter() {
        var celsius = parseFloat(document.getElementById('celsius').value);
        var fah = document.getElementById('fah');
        var convert = (celsius * 9 / 5) + 32;
        fah.value = convert;
    });

});