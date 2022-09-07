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
});

containerMoeda.addEventListener('click', function moeda(){
    modal.style.display = "flex";
    
});

containerTemp.addEventListener('click', function temperatura(){
    modal.style.display = 'flex';
    painel.innerHTML = `<div> 
                            <h1>Conversor de Temperatura</h1>
                            <div style="height:100px; font-size:60px; display:flex; justify-content:center ;margin-top:30px;">
                                <i class="fa-solid fa-temperature-quarter" class="temp" id="temp"></i>
                            </div>
                            <div>
                                <div>
                                    <label for="celsius" style="font-size:20px">Celsius</label>
                                    <input type="number" id="celsius" style="width:200px; padding:5px; border-radius:20px; font-size:15px">
                                </div>
                                <div>
                                    <label for="fahrenheits" style="font-size:20px">Fagrenheits</label>
                                    <input type="number" id="fah" style="width:200px; padding:5px; border-radius:20px; font-size:15px" disabled>
                                </div>
                            </div>
                            <div style="display:flex; justify-content:center; width:100%; margin-top:20px">
                                <button style="padding:20px; background-color:rgb(51, 31, 73); border:none; border-radius:30px; color:white" id="btnConvert">Converte</button>
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