var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngDialog']);
app.controller('mainCtrl', function($scope){
});

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/folio', {
			templateUrl: 'View/folio.html',
			controller: 'folioCtrl'
		})
		.when('/contact', {
			templateUrl: 'View/contact.html',
			controller: 'contactCtrl'
		})
		.otherwise({
        redirectTo: '/folio'
      	});
}]);
app.controller('contactCtrl', function($http, $scope, ngDialog){
	$scope.wrapperName = 'contactWrapper';
	//Submit msg to server
	$scope.submit = function(){
		var data = {};
		data.Name = $scope.Contact.name;
		data.Email = $scope.Contact.email;
		data.Msg = $scope.Contact.message;
		$scope.Contact = {};
		$scope.contactForm.$setPristine();
		
		$http.post('/api/submitMsg', data).success(function(data, status, headers, config){
			ngDialog.open({
			template : 'popup.html',
			className: 'ngdialog-theme-default'});
		});
	}
});

app.controller('folioCtrl', function($scope){
	$scope.wrapperName = 'folioWrapper';
});
app.directive('itemBox', function(){
	return {
		link: function(scope, elem){
			elem.bind('mouseover mouseout', function(){
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