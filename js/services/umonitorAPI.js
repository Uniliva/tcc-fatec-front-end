angular.module("umonitor").factory("umonitorAPI", function ($http, config) {
    var headers = {
        headers: {            
            "Content-Type": "application/json"
        }
    }
    var _validaUser = function (user) {
        return $http.post(config.baseUrl + "/usuario/login", user);
    };
    
    var _getDadosSensores = function () {
        return $http.get(config.baseUrl + "/sensores");
    };

     var _getDadosLojas = function () {
        return $http.get(config.baseUrl + "/loja");
    };
    
     var _postLoja = function (loja) {
        return $http.post(config.baseUrl + "/loja", loja);
    };    
     var _postSensor = function (sensor) {
        return $http.post(config.baseUrl + "/sensores", sensor);
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
        getDadosSensor: _getTodosDadosSensores

    };
});
