angular.module("umonitor").config(function ($routeProvider,  $locationProvider) {


    $routeProvider.otherwise({
        redirectTo: '/'
    });

    $routeProvider.when('/', {
        templateUrl: "/view/login.html",
        controller: "loginController"

    });
    $routeProvider.when('/dashboard', {
        templateUrl: "/view/dashboard.html",
        controller: "dashboardController"
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
                return umonitorAPI.getLojasDetalhes($route.current.params.id);                  
            }
        }
    });


    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
