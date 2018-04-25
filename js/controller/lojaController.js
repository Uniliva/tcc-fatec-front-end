angular.module("umonitor").controller("lojaController", function ($scope, lojasRouter, $location) {
    $scope.lojas = lojasRouter.data["estabelecimentos"];

    $scope.detalhes = function (loja) {
         $location.path("/detalhesLoja/"+loja.idEstabelecimento);     

    };

});
