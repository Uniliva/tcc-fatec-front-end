angular.module("umonitor").controller("detalhesLoja", function ($scope, lojaRouter,umonitorAPI) {
    $scope.loja=lojaRouter.data["estabelecimento"];

    console.log( $scope.loja);
    
    
    $scope.atualizarLoja = function(){       
        umonitorAPI.atualizarLoja($scope.loja).then(function(result){
             $scope.msgLoja="Dados da loja atualizado!";
        });
    };    
    $scope.atualizarSensor = function(){ 
        $scope.sensor.temperaturaMin = parseFloat($scope.sensor.temperaturaMin )
        $scope.sensor.temperaturaMax = parseFloat($scope.sensor.temperaturaMax )
        umonitorAPI.atualizarSensor($scope.sensor).then(function(result){
             $scope.msgSensor="Dados do Sensor atualizado!";
        });
    };
    
    $scope.carregaSensorModal= function(sensor){
        $scope.msgSensor="";
        $scope.sensor = sensor;
    };
        



});
