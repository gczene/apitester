describe('Form Controller', function () {

  'use strict';

  var scope, httpBackend, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));

  beforeEach(inject(function ($httpBackend, $rootScope, $controller) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    projects = {
      project: {
        form: {
          url: '/test',
          method: 'get',
          data: {}
        },
        responses: []
      },
      save: function (project) {
        this.project = project;
        return 1;
      }
    };
    scope.project = projects.project;
    scope.form = projects.project.form;
    ctrl = $controller('FormCtrl', {
      $scope: scope,
      projects: projects
    });
  }));

  it('should submit and save a success response', function () {
    httpBackend.expectGET('/test').respond({success: true});
    scope.submit();
    expect(scope.project.responses).toEqual([]);
    httpBackend.flush();
    expect(scope.project.responses).toEqual([{
      data: {success: true},
      status: 200,
      error: false
    }]);
  });

  it('should submit and save an error response', function () {
    httpBackend.expectGET('/test').respond(500, {error: true});
    scope.submit();
    expect(scope.project.responses).toEqual([]);
    httpBackend.flush();
    expect(scope.project.responses).toEqual([{
      data: {error: true},
      status: 500,
      error: true
    }]);
  });
});
