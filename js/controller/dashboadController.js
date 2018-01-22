angular.module("umonitor").controller("dashboadController", function ($scope, umonitorAPI, $location) {
    var loop;
    var getDadosDados = function () {
        delete $scope.sensores;
        $scope.sensores = [];
        umonitorAPI.getDados().then(function (resultado) {
                       
            var lista = resultado.data;
            lista.forEach(function (s) {
                var sensor = {}
                sensor.id = s.id;
                sensor.desc = s.descricaoSensor;
                sensor.item = s.tipoItemMonitorado;
                sensor.tMin = s.temperaturaMin;
                sensor.tMax = s.temperaturaMax;               
                if (s.dados.length > 0) {
                     sensor.data = s.dados[0].dataAtual;
                     if (s.dados[0].temperaturaAtual >= s.temperaturaMax) {
                        sensor.tema = "danger";
                        sensor.msg = "Temperatura acima do limite maximo!";
                        sensor.tAtual = s.dados[0].temperaturaAtual;
                        $scope.sensores.unshift(sensor)
                    } else if (s.dados[0].temperaturaAtual <= s.temperaturaMin) {
                        sensor.tema = "danger";
                        sensor.msg = "Temperatura abaixo do limite minimo!";
                        sensor.tAtual = s.dados[0].temperaturaAtual;
                        $scope.sensores.unshift(sensor)
                    } else if (s.dados[0].temperaturaAtual > s.temperaturaMin && s.dados[0].temperaturaAtual < s.temperaturaMax) {
                        sensor.tema = "success";
                        sensor.msg = "Temperatura dentro do padrão!";
                        sensor.tAtual = s.dados[0].temperaturaAtual;
                        $scope.sensores.push(sensor);
                    }
                }

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
        $location.path("/grafico/"+sensor.id);
    };

    getDadosDados();


});
