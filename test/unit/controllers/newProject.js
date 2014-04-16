describe('NewProject Controller', function () {

  'use strict';

  var scope, location, projects, ctrl;


  beforeEach(module('apitesterApp.controllers'));


  beforeEach(inject(function ($rootScope, $location, $controller) {
    scope = $rootScope.$new();
    location = $location;
    projects = {
      project: undefined,
      save: function (project) {
        this.project = project;
        return 1;
      }
    };
    ctrl = $controller('NewProjectCtrl', {
      $scope: scope,
      $location: location,
      projects: projects
    });
  }));


  it('should create a new project', function () {
    location.path('/test');
    expect(scope.project).toEqual({
      name: '',
      forms: [],
      responses: []
    });
    scope.project.name = 'test';
    scope.formsJson = '[{"test":true}]';
    scope.save();
    expect(projects.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });
    expect(location.path()).toBe('/project/1');
  });
});
