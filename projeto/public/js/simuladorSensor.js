function simularSensorJogandoDadoNoBanco(){

    fetch(`/sensor/buscarSensores`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                
                qtdSensores = resposta[0].qtdSensor;

                while(true){
                    var fkSensor = parseInt(Math.random() * qtdSensores + 1);
                    var temperatura = (Math.random()* 8 + 1).toFixed(2);

                    var status = ``;

                    if(temperatura <= 2.00){

                      status = `Crítico Frio`

                    }else if(temperatura <= 4.45){

                      status = `Alerta Frio`

                    }else if(temperatura <= 6.75){

                      status = `Ideal`

                    }else if(temperatura <= 7.98){

                      status = `Alerta Calor`

                    }else{

                      status = `Crítico Calor`
                    }
            
                    fetch("/sensor/cadastrarMedidas", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          // crie um atributo que recebe o valor recuperado aqui
                          // Agora vá para o arquivo routes/usuario.js
                          fkSensorServer: fkSensor,
                          temperaturaServer: temperatura,
                          statusServer: status
                        }),
                      })
                        .then(function (resposta) {
                          console.log("resposta: ", resposta);
                  
                          if (resposta.ok) {
                           
                            setTimeout(() => {
                            simularSensorJogandoDadoNoBanco()
                            }, "5000");
                  
                          } else {
                            throw "Houve um erro ao tentar realizar o cadastro!";
                          }
                        })
                        .catch(function (resposta) {
                          console.log(`#ERRO: ${resposta}`);
                        });
                  
                      return false;
                 }
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

    
}