var appModule = angular.module('app', []);
appModule.directive('filter', function() {
    return {
        restrict: 'ECMA',
        template: '<div>Hi i am a filter2 box.</div>',
        replace: true
    };
});