angular.module("umonitor").config(function ($httpProvider) {
	$httpProvider.interceptors.push("loadingInterceptor");
});
