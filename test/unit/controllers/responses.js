describe('Responses Controller', function () {

  'use strict';

  var scope, httpBackend, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));

  beforeEach(inject(function ($rootScope, $httpBackend, $controller) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
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

  it('should return the loading state', function () {
    expect(scope.isLoading()).toBe(false);
  });

  it('should remove a response by index', function () {
    expect(scope.project.responses).toEqual([1, 2, 3]);
    scope.remove(projects.project.responses[1]);
    expect(scope.project.responses).toEqual([1, 3]);
  });
});
