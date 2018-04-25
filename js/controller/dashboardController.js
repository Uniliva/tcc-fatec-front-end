angular.module("umonitor").controller("dashboardController", function ($scope, umonitorAPI, $location) {
    var loop;
    var getDadosDados = function () {
        delete $scope.sensores;
        $scope.sensores = [];
        umonitorAPI.getDados().then(function (resultado) {
                       
            var lista = resultado.data["sensores"];
            console.log("sensorwe"+ lista)
            lista.forEach( s =>{
                var sensor = {}
                sensor.id = s.id;
                sensor.codigo = s.codigo;
                sensor.desc = s.decricao;
                sensor.item = s.nomeEstabelemento;
                sensor.tMin = s.temperaturaMin;
                sensor.tMax = s.temperaturaMax;          
                
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
            if (local === "/dashboard") {
                //chama a função que atualiza a cada x tempo em milisegundo
                setTimeout(getDadosDados,50000);
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
