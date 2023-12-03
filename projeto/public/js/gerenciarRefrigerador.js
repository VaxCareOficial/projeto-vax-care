function cadastrarRefrigerador() {
    var tipoVacina = inputTipoVacina.value;
    var temperaturaMaxima = inputTemperaturaMaxima.value;
    var temperaturaMinima = inputTemperaturaMinima.value;
    var nomeSensor = inputNomeSensor.value;
    var filial = selectFilial.value;

    if (tipoVacina == "") inputTipoVacina.classList.add("error");
    if (temperaturaMaxima == "") inputTemperaturaMaxima.classList.add("error");
    if (temperaturaMinima == "") inputTemperaturaMinima.classList.add("error");
    if (nomeSensor == "") inputNomeSensor.classList.add("error");
    if (filial == 0) selectFilial.classList.add("error");

    if (tipoVacina != "" && temperaturaMaxima != "" && temperaturaMinima != "" && nomeSensor != "" && filial != 0) {
        fetch("/refrigerador/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipoVacinaServer: tipoVacina,
                temperaturaMaximaServer: temperaturaMaxima,
                temperaturaMinimaServer: temperaturaMinima,
                nomeSensorServer: nomeSensor,
                filialServer: filial
            })
        }).then(resposta => {
            if (resposta.status == 201) {
                inputTipoVacina.value = "";
                inputTemperaturaMaxima.value = "";
                inputTemperaturaMinima.value = ""
                inputNomeSensor.value = "";
                selectFilial.value = 0;

                alert("Refrigerador cadastrado com sucesso!");
            } else {
                console.log("Houve um problema ao cadastrar o refrigerador!");
            }
        });
    }
}

function gerarEnderecoFilial() {
    selectFilial.innerHTML = `<option value="0">Selecionar</option>`;

    fetch(`/empresa/gerar-enderecos/${idEmpresa}`)
        .then(resposta => {
            resposta.json().then(resposta => {
                for (var i = 0; i < resposta.length; i++) {
                    selectFilial.innerHTML += `
                    <option value="${resposta[i].idEnderecoFilial}">${resposta[i].logradouro}</option>
                    `;
                }
            });
        });
}

function removerErroInput(input) {
    if (input.value != "") input.classList.remove("error");
}