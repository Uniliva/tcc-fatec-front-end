angular.module("umonitor").controller("lojaController", function ($scope, lojasRouter, $location) {
    $scope.lojas = lojasRouter.data;
    console.log( $scope.lojas);

    $scope.detalhes = function (loja) {
         $location.path("/detalhesLoja/"+loja.idEstabelecimento);     

    };

});
