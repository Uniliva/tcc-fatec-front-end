angular.module("umonitor").controller("graficoController", function ($scope, $location, dadosRouter, $filter) {
    $scope.dados = dadosRouter.data;

    var populaGrafico = function () {
        $scope.labels = [];
        $scope.data = [];
        $scope.series = ['Sensor'];
        $scope.dados.forEach(function (d) {
            $scope.labels.push($filter("date")(d.dataAtual, 'M/d/yy h:mm a'));
            $scope.data.push(d.temperaturaAtual);
        });

        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.datasetOverride = [{
            yAxisID: 'y-axis-1'
}];
        $scope.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
        }

      ]
            }
        };
    }

    populaGrafico();


});