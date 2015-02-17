var app = angular.module('myApp', ['ngRoute']);
app.controller('mainCtrl', function($scope){

});

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/folio', {
			templateUrl: 'View/folio.html'
		})
		.when('/contact', {
			templateUrl: 'View/contact.html'
		})
		.otherwise({
        redirectTo: '/folio'
      	});
}]);

app.directive('itemBox', function(){
	return {
		link: function(scope, elem){
			elem.bind('mouseenter mouseleave', function(){
				elem.children().toggleClass('show');
			});
		}
	}
});
app.directive('plink', function(){
	return {
		link: function(scope, elem){
			elem.bind('click', function(){
				elem.parent().children().css('color','white');
				elem.css('color', '#5ef9ff')
			});
		}
	}
});