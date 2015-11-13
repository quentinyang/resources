var appModule = angular.module('app', []);
appModule.directive('filter', function() {
    return {
        restrict: 'ECMA',
        template: '<div>Hi i am a filter box.<p ng-transclude></p></div>',
        transclude: true,
        replace: true
    };
});

appModule.controller('MyCtrl', function($scope) {
    $scope.filters = ['price','area','district','community','room'];
});