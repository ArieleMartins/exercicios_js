const modal = document.getElementById('modal');
const containerMoeda = document.getElementById('moeda');
const containerTemp = document.getElementById('temperatura');
const containerLuz = document.getElementById('luz');
const close = document.getElementById('close');
const painel = document.getElementById('painel');

close.addEventListener('click', function fechar(){
    modal.style.display = "none";
    painel.innerHTML = "";
})

containerLuz.addEventListener('click', function luz(){
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

    convert.addEventListener('click', function converteMetroAno(){
        const valor = parseFloat(document.getElementById('valor').value);
        var convertido = valor / 9.461;
        anoluz.value = convertido.toFixed(4);
    });
});

containerMoeda.addEventListener('click', async function moeda(){
    var moedaName = [];
    var moedaValor = [];
    var test = [];
    modal.style.display = "flex";
    const moedas = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL").then((response) => response.json()).then((name) => test.push(name) 
    ).catch(console.log("Ops.. Ocorreu um erro"));
});

containerTemp.addEventListener('click', function temperatura(){
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
    btnConvert.addEventListener('click', function Converter(){
        var celsius = parseFloat(document.getElementById('celsius').value);
        var fah = document.getElementById('fah');
        var convert = (celsius * 9/5) + 32;
        fah.value = convert;
    });

});