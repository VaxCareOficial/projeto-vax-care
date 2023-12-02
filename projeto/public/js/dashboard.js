const form = document.getElementById("form");
const line1Title = document.querySelector(".column-1 .line-1");
const containerPrincipal = document.querySelectorAll(".container-principal");
const containerSensor = document.querySelectorAll(".container-sensor");
const inputSearch = document.getElementById("inputSearch");
const imgInput = document.getElementById("imgInput");

const idUsuario = sessionStorage.getItem("idUsuario");
const nomeUsuario = sessionStorage.getItem("nomeUsuario");
const nomeFantasia = sessionStorage.getItem("nomeFantasia");

let proximaAtualizacao;
let refrigeradorDisponivel = ``;

let listaDisponivel = []
let listaSensores = []

window.addEventListener("load", () => {
    if (tipoUsuario == "Administrador") {
        nome.innerHTML = nomeFantasia;
    } else {
        nome.innerHTML = nomeUsuario;
    }
});

function validarRefrigeradoresDisponiveis(idUsuario) {
    fetch(`/refrigerador/buscarRefrigeradores/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);
            for (let i = 0; i < resposta.length; i++) {
                let dado = resposta[i]
                listaDisponivel.push(dado.idRefrigerador)
                listaSensores.push(dado.idSensor)
            }


            buscarAlertas()
        });

    })
}

// função que busca o ultimo alerta de cada sensor/refrigerador

async function buscarAlertas(){
    for (let i = 0; i < listaSensores.length; i++) {
        var resposta = await fetch(`/refrigerador/buscarAlertas/${listaSensores[i]}`)
        var dado = await resposta.json();
       console.log(dado);
       alert(dado[0].statusAlert);
    }
}

function cleanSearch() {
    inputSearch.value = "";
    line1Title.innerHTML = "<h1>Bem-vindo, <span>Pfizer</span></h1>";
    imgInput.src = "../assets/svg/search-icon.svg";
    imgInput.classList.remove("active");
    containerPrincipal.forEach((e) => e.style.display = "flex");
    containerSensor.forEach((e) => e.style.display = "none");

    variacao.innerHTML = ``
}

imgInput.addEventListener("click", cleanSearch)

const graficoVariacao = document.getElementById('grafico_variacao_temperatura');

function searchSensor() {

    let searchText = inputSearch.value;

    id_refrigerador_pesquisado.innerHTML = searchText;
    let existeRefrigeradorNaLista = false;

    for (let i = 0; i < listaDisponivel.length; i++) {
        if (listaDisponivel[i] == searchText) {
            existeRefrigeradorNaLista = true
        }
    }

    if (existeRefrigeradorNaLista == true && searchText != "") {
        line1Title.innerHTML = "<h1>Painel de controle <span>detalhado</span></h1>";
        imgInput.src = "../assets/svg/x-icon.svg";
        imgInput.classList.add("active");
        containerPrincipal.forEach((e) => e.style.display = "none");
        containerSensor.forEach((e) => e.style.display = "flex");

        selecionarTipodeVacina(searchText);



        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        // searchText é o que será digitado na barra de pesquisa e quem será levado como parâmetro 

        fetch(`/refrigerador/buscarDados/${searchText}/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, searchText);

                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });

    } else {
        cleanSearch()
        alert(`Voce nao tem o refrigerador de número ${searchText}!`);
    }
}

function plotarGrafico(resposta, searchText) {
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "buscarDados" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        // var registro = resposta[i];
        labels.push(resposta[i].data);
        dados.datasets[0].data.push(resposta[i].temperatura);

    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`grafico_variacao_temperatura`),
        config
    );

    setTimeout(() => atualizarGrafico(searchText, dados, myChart), 2000);
}

function atualizarGrafico(searchText, dados, myChart) {
    fetch(`/refrigerador/buscarEmTempoReal/${searchText}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {


                // alertar(novoRegistro, idAquario);
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                ultima_temperatura.innerHTML = `${novoRegistro[0].temperatura}°C`;


                let diferencaTemperatura = 90;
                let mensagemDiferencaTemperatura = ``

                if (novoRegistro[0].temperatura < 4.46) {

                    diferencaTemperatura = 4.46 - novoRegistro[0].temperatura;
                    mensagemDiferencaTemperatura = `Abaixo da temperatura ideal`

                } else if (novoRegistro[0].temperatura > 6.75) {

                    diferencaTemperatura = novoRegistro[0].temperatura - 6.75;
                    mensagemDiferencaTemperatura = `Acima da temperatura ideal`

                } else {

                    diferencaTemperatura = novoRegistro[0].temperatura - 0;
                    mensagemDiferencaTemperatura = `Dentro da temperatura ideal`
                }

                id_diferenca_temperatura.innerHTML = `${diferencaTemperatura.toFixed(2)}°C`;
                id_mensagem_diferenca_temperatura.innerHTML = mensagemDiferencaTemperatura;


                // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                // avisoCaptura.innerHTML = ""


                if (novoRegistro[0].data == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    console.log("igual caralho")
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].data)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")


                } else {
                    // tirando e colocando valores no gráfico
                    console.log("difeente caralho")
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de umidade



                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(searchText, dados, myChart), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(searchText, dados, myChart), 1000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function selecionarTipodeVacina(searchText) {
    fetch(`/refrigerador/buscarVacina/${searchText}`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (resposta) {
            console.log(`Dados obtidos: ${JSON.stringify(resposta)}`);

            id_tipo_vacina.innerHTML = resposta[0].nome;

        });
    })
}


inputSearch.addEventListener("input", searchSensor);



function retornarIndex() {
    sessionStorage.clear();
    window.location.href = "../index.html"
}

window.addEventListener("load", () => {
    if (!idEmpresa) {
        window.location.href = "../login.html";
    }
});