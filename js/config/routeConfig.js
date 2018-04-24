angular.module("umonitor").config(function ($routeProvider,  $locationProvider) {


    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $routeProvider.when('/', {
        templateUrl: "/view/login.html",
        controller: "loginController"

    });
    $routeProvider.when('/dashboad', {
        templateUrl: "/view/dashboad.html",
        controller: "dashboadController"
    });
    
    $routeProvider.when('/grafico/:id', {
        templateUrl: "/view/graficosSensor.html",
        controller: "graficoController",
         resolve: {
            dadosRouter: function (umonitorAPI, $route) {
                return umonitorAPI.getDadosSensorQtd($route.current.params.id,20);
                }
             
            }
        
    });

    $routeProvider.when('/lojas', {
        templateUrl: "/view/loja.html",
        controller: "lojaController",
        resolve: {
            lojasRouter: function (umonitorAPI) {
                return umonitorAPI.getLojas();
            }
        }
    });
    $routeProvider.when('/detalhesLoja/:id', {
        templateUrl: "/view/detalhesloja.html",
        controller: "detalhesLoja",
        resolve: {
            lojaRouter: function (umonitorAPI, $route) {
                return umonitorAPI.getLojas().then(function (result) {
                    lojas = result.data;
                    loja = lojas.filter(function (loja) {
                        return loja.idEstabelecimento == $route.current.params.id;
                    });
                    return loja[0];

                })
            }
        }
    });


    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
