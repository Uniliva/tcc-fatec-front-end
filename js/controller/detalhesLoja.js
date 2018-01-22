angular.module("umonitor").controller("detalhesLoja", function ($scope, lojaRouter,umonitorAPI) {
    $scope.loja=lojaRouter;
    
    
    $scope.atualizarLoja = function(){       
        umonitorAPI.postLoja($scope.loja).then(function(result){
             $scope.msgLoja="Dados da loja atualizado!";
        });
    };    
    $scope.atualizarSensor = function(){   
        umonitorAPI.postSensor($scope.sensor).then(function(result){
             $scope.msgSensor="Dados do Sensor atualizado!";
        });
    };
    
    $scope.carregaSensorModal= function(sensor){
        $scope.msgSensor="";
        $scope.sensor = sensor;
    };
        



});
