describe('ResponsesCtrl', function () {

  'use strict';

  var http, scope, httpBackend, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));
  beforeEach(inject(function ($http, $rootScope, $httpBackend, $controller) {

    http = $http;

    scope = $rootScope.$new();

    httpBackend = $httpBackend;

    // mock a minimal projects service
    projects = {
      project: {
        responses: [1, 2, 3]
      },
      save: function (project) {
        this.project = project;
      }
    }
    scope.project = projects.project;

    ctrl = $controller('ResponsesCtrl', {
      $scope: scope,
      projects: projects
    });
  }));

  // tests ...

  it('should return the loading state', function () {
    expect(scope.isLoading()).toBe(false);
  });

  it('should remove a response by index', function () {

    // check initial responses
    expect(scope.project.responses).toEqual([1, 2, 3]);

    // remove the second response
    scope.remove(projects.project.responses[1]);

    // check if the response has been removed
    expect(scope.project.responses).toEqual([1, 3]);
  });
});
