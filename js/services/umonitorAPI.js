angular.module("umonitor").factory("umonitorAPI", function ($http, config) {
    var headers = {
        "headers": {            
            "Content-Type": "application/json"
        }
    }
    var _validaUser = function (user) {
        return $http.post(config.baseUrl + "/usuario/login", user);
    };
    
    var _getDadosSensores = function () {
        return $http.get(config.baseUrl + "/sensores/todos");
    };

    var _getDadosSensoresQtd = function (idSensor, qtd) {        
        return $http.get(config.baseUrl + "/dados/sensor/"+idSensor+"/quantidade/"+qtd);
    };

     var _getDadosLojas = function () {
        return $http.get(config.baseUrl + "/lojas/todos");
    };
    
     var _postLoja = function (loja) {
        return $http.post(config.baseUrl + "/lojas/nova", loja);
    };    
     var _postSensor = function (sensor) {
        return $http.post(config.baseUrl + "/sensores/novo", sensor);
    };
    
    var _getTodosDadosSensores = function (idLoja) {
        return $http.get(config.baseUrl + "/dados/"+ idLoja);
    };    
    
    return {
        ehValido: _validaUser,
        getDados: _getDadosSensores,
        getLojas: _getDadosLojas,
        postLoja: _postLoja,
        postSensor:_postSensor,
        getDadosSensor: _getTodosDadosSensores,
        getDadosSensorQtd: _getDadosSensoresQtd

    };
});
