angular.module("umonitor").controller("loginController", function($scope, umonitorAPI,$location){
    $scope.logar= function(){
        console.log($scope.user);
        umonitorAPI.ehValido($scope.user).then(function(result){
            $location.path("/dashboard");
        }).catch(function (error) {
            if (error.status === 400) {                
                 $scope.msgLogin = "Usuario não cadastrado!";                               
            } else {                
                 $scope.msgLogin = "E-mail ou senha inválidos!";
                 console.log(error)
            }
        });
    }
});