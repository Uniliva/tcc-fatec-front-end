angular.module("umonitor").factory("umonitorAPI", function ($http, config) {
    var headers = {
        "headers": {            
            "Content-Type": "application/json"
        }
    }
    var _validaUser = function (user) {
        return $http.post(config.baseUrl + "/usuarios/login", user);
    };
    
    var _getDadosSensores = function () {
        return $http.get(config.baseUrl + "/sensores/todos");
    };

    var _getDadosSensoresQtd = function (idSensor, qtd) {        
        return $http.get(config.baseUrl + "/dados/sensor/"+idSensor+"/quantidade/"+qtd);
    };

     var _getDadosLojas = function () {
        return $http.get(config.baseUrl + "/estabelecimentos/todos");
    };

    var _getDadosLojasDetalhes = function (id) {
        return $http.get(config.baseUrl + "/estabelecimentos/id/"+id);
    };
    
     var _postLoja = function (loja) {
         loja.id = loja.idEstabelecimento;
        return $http.post(config.baseUrl + "/estabelecimentos/atualizar", loja);
    };    
     var _postSensor = function (sensor) {
        return $http.post(config.baseUrl + "/sensores/atualizar", sensor);
    };
    
    var _getTodosDadosSensores = function (idLoja) {
        return $http.get(config.baseUrl + "/dados/"+ idLoja);
    };    
    
    return {
        ehValido: _validaUser,
        getDados: _getDadosSensores,
        getLojas: _getDadosLojas,
        getLojasDetalhes:_getDadosLojasDetalhes,
        atualizarLoja: _postLoja,
        atualizarSensor:_postSensor,
        getDadosSensor: _getTodosDadosSensores,
        getDadosSensorQtd: _getDadosSensoresQtd

    };
});
