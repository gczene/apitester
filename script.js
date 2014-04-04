'use strict';



var app = angular.module('app', []);



app.service('formService', function () {

    var self = this;

    this.list = angular.fromJson(localStorage.forms) || [];

    this.add = function (params) {
        self.list.push({
            url: params.url || '/',
            method: params.method || 'get',
            label: params.label || params.url || '/',
            fields: params.fields || [],
            data: {}
        });
        localStorage.forms = angular.toJson(self.list);
    };

    this.setList = function (list) {
        this.list = angular.fromJson(list);
        localStorage.forms = list;
    };
});



app.service('responseService', function () {

    var self = this;

    this.list = angular.fromJson(localStorage.responses) || [];

    this.remove = function (index) {
        this.list.splice(index, 1);
        localStorage.responses = angular.toJson(self.list);
    };

    this.addSuccess = function (data, status) {
        self.list.unshift({
            status: status,
            data: data,
            error: false
        });
        localStorage.responses = angular.toJson(self.list);
    };

    this.addError = function (data, status) {
        self.list.unshift({
            status: status,
            data: data,
            error: true
        });
        localStorage.responses = angular.toJson(self.list);
    };
});



app.controller('FormListController', [

    '$scope',
    '$filter',
    'formService',

    function ($scope, $filter, formService) {

        $scope.forms = formService.list;

        $scope.editor = {
            show: false,
            content: $filter('json')(formService.list)
        };

        $scope.toggleEditor = function () {
            $scope.editor.show = !$scope.editor.show;
        };

        $scope.saveForms = function () {
            formService.setList($scope.editor.content);
            location.reload();
        };
    }
]);



app.controller('FormController', [

    '$scope',
    '$http',
    'responseService',

    function ($scope, $http, responseService) {

        $scope.sendRequest = function () {
            var request = $http({
                url: $scope.form.url,
                method: $scope.form.method,
                params: $scope.form.data
            });
            request.success(responseService.addSuccess);
            request.error(responseService.addError);
        };
    }
]);



app.controller('ResponseListController', [

    '$scope',
    'responseService',

    function ($scope, responseService) {

        $scope.responses = responseService.list;

        $scope.remove = function (index) {
            responseService.remove(index);
        };
    }
]);
