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

let qtdAlertaPorRefrigerador = ``;

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

async function buscarAlertas() {
    for (let i = 0; i < listaSensores.length; i++) {
        var resposta = await fetch(`/refrigerador/buscarAlertas/${listaSensores[i]}`)
        var dado = await resposta.json();
        console.log(dado);
        alert(dado[0].statusAlert);
    }
}

function limparBusca() {
    inputSearch.value = "";

    if (tipoUsuario == "Administrador") {
        line1Title.innerHTML = `<h1>Bem-vindo, <span>${nomeFantasia}</span></h1>`;
    } else {
        line1Title.innerHTML = `<h1>Bem-vindo, <span>${nomeUsuario}</span></h1>`;
    }

    imgInput.src = "../assets/svg/search-icon.svg";
    containerPrincipal.forEach((e) => e.style.display = "none");
    containerSensor.forEach((e) => e.style.display = "flex");
}

searchBtn.addEventListener("click", limparBusca)

const graficoVariacao = document.getElementById('grafico_variacao_temperatura');



function buscarRefrigerador() {

    let searchText = inputSearch.value;

    id_refrigerador_pesquisado.innerHTML = searchText;
    let existeRefrigeradorNaLista = false;


    buscarQuantidadeAlertas(searchText)

    for (let i = 0; i < listaDisponivel.length; i++) {
        if (listaDisponivel[i] == searchText) {
            existeRefrigeradorNaLista = true
        }
    }



    if (existeRefrigeradorNaLista == true) {


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

        alert(`Voce nao tem o refrigerador de número ${searchText}!`);
    }
}


function plotarGrafico(resposta, searchText) {
    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];
    let corLinha = ``;


    if (resposta[resposta.length - 1].statusAlert == "Crítico Frio" || resposta[resposta.length - 1].statusAlert == "Crítico Calor") {

        corLinha = `#960000`

    } else if (resposta[resposta.length - 1].statusAlert == "Alerta Frio" || resposta[resposta.length - 1].statusAlert == "Critico Calor") {

        corLinha = `rgb(216, 178, 9)`

    } else if (resposta[resposta.length - 1].statusAlert == "Ideal") {
        corLinha = `#41bd69`
    }

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: `${corLinha}`,
            backgroundColor: `${corLinha}`,
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

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].data)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")


                } else {


                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].data); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de umidade



                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(searchText, dados, myChart), 1000);
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

function contarRefrigeradoresEmpresa() {
    fetch(`/refrigerador/contarRefrigeradoresEmpresa/${idEmpresa}`)
        .then(resposta => {
            resposta.json().then(resposta => {
                refrigeradoresRegistrados.innerHTML = resposta[0].qtdRefrigerador;
            })
        })
}


function enviarPorEnter(e) {
    if (e.key == "Enter") {
        if (document.activeElement != searchBtn) {
            searchBtn.click();
        }
    }
}



function buscarQuantidadeAlertas(searchText) {
    fetch(`/refrigerador/buscarQuantidadeAlertas`, { cache: 'no-store' }).then(function (response) {
        response.json().then(function (qtdAlerta) {
            console.log(`Dados obtidos: ${JSON.stringify(qtdAlerta)}`);

            for (let i = 0; i < qtdAlerta.length; i++) {

                if (searchText == qtdAlerta[i].refrigerador) {

                    posicaoQuantidadeAlertas.innerHTML = `#${i + 1}`
                }
            }
        });
    })
}

function abrirListaAlerta() {
    containerAlertas.classList.toggle("active");
    qtdAlertas.innerHTML = "";
}



let pctAlerta = 0;
let pctIdeal = 0;


// kpi 
function selecionarUltimoDadoPorRefrigerador(idUsuario) {
    fetch(`/refrigerador/ultimoDadoRefrigeradorDisponivel/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`teste de dado recebido ${resposta[0].ultimoDado}`)

                let listaUltimosDadosEmAlerta = []
                let listaUltimosDadosEmEstadoIdeal = [];

                let qtdIdeal = 0;
                let qtdAlerta = 0;
                let totalCadastrado = 0;



                for (let i = 0; i < resposta.length; i++) {


                    let idDadosSensor = resposta[i].ultimoDado;


                    fetch(`/refrigerador/statusEtemperaturaUltimoDado/${idDadosSensor}`, { cache: 'no-store' }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (respostacu) {

                                for (let i = 0; i < respostacu.length; i++) {

                                    if (respostacu[i].statusAlert.indexOf('Alerta') > -1 || respostacu[i].statusAlert.indexOf('Crítico') > -1) {

                                        listaUltimosDadosEmAlerta.push(respostacu[i].statusAlert)
                                    } else {
                                        listaUltimosDadosEmEstadoIdeal.push(respostacu[i].statusAlert)
                                    }
                                }




                                emEstadoIdeal.innerHTML = listaUltimosDadosEmEstadoIdeal.length;
                                emEstadoDeAlerta.innerHTML = listaUltimosDadosEmAlerta.length;
                                refrigeradoresRegistrados.innerHTML = listaDisponivel.length;


                                totalCadastrado = listaDisponivel.length;
                                qtdAlerta = listaUltimosDadosEmAlerta.length;
                                qtdIdeal = listaUltimosDadosEmEstadoIdeal.length;

                                pctAlerta = (qtdAlerta * 100) / totalCadastrado;
                                pctIdeal = (qtdIdeal * 100) / totalCadastrado;

                                setTimeout(() => {
                                    const dataPizza = {
                                        labels: ['Funcionando em temperatura ideal',
                                            'Em estado de alerta'],
                                        datasets: [{
                                            data: [pctIdeal, pctAlerta],
                                            backgroundColor: [
                                                '#74abe0',
                                                '#ea5965']
                                        }]
                                    };

                                    const configPizza = {
                                        type: 'pie',
                                        data: dataPizza,
                                        options: {}
                                    };

                                    const GraficoPizza = new Chart(
                                        document.getElementById('GraficoPizza'),
                                        configPizza
                                    );
                                }, 100);


                                setTimeout(() => selecionarUltimoDadoPorRefrigerador(idUsuario), 10000);


                            });
                        } else {
                            console.error('Nenhum dado encontrado ou erro na API');
                            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

                        }
                    })
                        .catch(function (error) {
                            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                        });


                }




            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}






function buscarQuantidadeDeRefrigeradorPorVacina(idUsuario) {
    fetch(`/refrigerador/buscarQuantidadePorVacina/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (respostaaa) {

                console.log(`foi bomba ${respostaaa[1].refrigeradores}`)

                plotarGraficoQuantidadeVacina(respostaaa)
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar

        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGraficoQuantidadeVacina(respostaaa) {

    console.log('iniciando plotagem do gráfico...');



    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: [],
        datasets: [{
            label: 'Refrigeradores',
            data: [],
            fill: false,
            borderColor: [`#3ca9c2`, '#838383'],
            backgroundColor: [`#3ca9c2`, '#838383'],
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "buscarDados" e passados para "plotarGrafico":')
    console.log(respostaaa[0])

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < respostaaa.length; i++) {
        // var registro = resposta[i];
        dados.labels.push(respostaaa[i].vacina);
        dados.datasets[0].data.push(respostaaa[i].refrigeradores);

    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')

    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChartBar = new Chart(
        document.getElementById(`GraficoBar`),
        config
    );

}





document.addEventListener("keypress", enviarPorEnter);