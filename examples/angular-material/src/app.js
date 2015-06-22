angular.module('GulpWizardExample', ['templates', 'ngMaterial', 'ngMdIcons', 'ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('app', {
            abstract: true,
            templateUrl: 'app.html',
            controller: 'AppCtrl'
        }).state('app.welcome', {
            url: '/',
            template: 'Hello World'
        });
    }]).controller('AppCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };
    }]);