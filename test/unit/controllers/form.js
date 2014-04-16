describe('FormCtrl', function () {

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

  // tests ...

  it('should submit and save a success response', function () {

    // preapre a successfull request
    httpBackend.expectGET('/test').respond({success: true});

    // submit the current form
    scope.submit();

    // check the initial project state
    expect(scope.project.responses).toEqual([]);

    // check if the response was saved as expected
    httpBackend.flush();
    expect(scope.project.responses).toEqual([{
      data: {success: true},
      status: 200,
      error: false
    }]);
  });

  it('should submit and save an error response', function () {

    // preapre an unsuccessfull request
    httpBackend.expectGET('/test').respond(500, {error: true});

    // submit the current form
    scope.submit();

    // check the initial project state
    expect(scope.project.responses).toEqual([]);

    // check if the response was saved as expected
    httpBackend.flush();
    expect(scope.project.responses).toEqual([{
      data: {error: true},
      status: 500,
      error: true
    }]);
  });
});
