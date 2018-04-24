angular.module("umonitor").controller("dashboadController", function ($scope, umonitorAPI, $location) {
    var loop;
    var getDadosDados = function () {
        delete $scope.sensores;
        $scope.sensores = [];
        umonitorAPI.getDados().then(function (resultado) {
                       
            var lista = resultado.data["sensores"];
            lista.forEach( dado =>{
                var sensor = {}
                sensor.id = dado.id;
                sensor.codigo = dado.codigo;
                sensor.desc = dado.decricao;
                sensor.item = dado.nomeEstabelemento;
                sensor.tMin = dado.temperaturaMin;
                sensor.tMax = dado.temperaturaMax;               
                
                var dados =   umonitorAPI.getDadosSensorQtd(sensor.id,1).then(result => {
                   var dados = result.data["dados"];
                 dados.forEach( dado => {
                     sensor.data = dado.dataAtual;
                     sensor.energia = dado.temEnergia;
                     if (!dado.temEnergia) {
                        sensor.tema = "danger";
                        sensor.msg = "Falta de Energia na loja!";
                        sensor.tAtual = dado.temperaturaAtual;
                        $scope.sensores.unshift(sensor)
                    } else if (dado.temperaturaAtual >=  sensor.tMax) {
                        sensor.tema = "danger";
                        sensor.msg = "Temperatura acima do limite maximo!";
                        sensor.tAtual = dado.temperaturaAtual;
                        $scope.sensores.unshift(sensor)
                    } else if (dado.temperaturaAtual <= sensor.tMin) {
                        sensor.tema = "danger";
                        sensor.msg = "Temperatura abaixo do limite minimo!";
                        sensor.tAtual = dado.temperaturaAtual;
                        $scope.sensores.unshift(sensor)
                    } else if (dado.temperaturaAtual > sensor.tMin && dado.temperaturaAtual < sensor.tMax) {
                        sensor.tema = "success";
                        sensor.msg = "Temperatura dentro do padrão!";
                        sensor.tAtual = dado.temperaturaAtual;
                        $scope.sensores.push(sensor);
                    }
                });
                
            });

            });

            var local = $location.path();
            if (local === "/dashboad") {
                //chama a função que atualiza a cada x tempo em milisegundo
                setTimeout(getDadosDados,20000);
            }


        }).catch(function (erro) {
            console.log("erro");
            console.log(erro);
        });
    }
    
    
     $scope.grafico = function(sensor){
        $location.path("/grafico/"+sensor);
    };

    getDadosDados();


});
