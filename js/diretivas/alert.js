angular.module("umonitor").directive("uAlert", function () {
    return {
        templateUrl: "view/components/alert.html",
        replace: true,
        restrict: "E",
        scope: {
            sensor:'='
            
        }

    }
});
