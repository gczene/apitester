describe('NewProjectCtrl', function () {

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

  // tests ...

  it('should save a new project', function () {

    // set initial location
    location.path('/test');

    // check the initial project state
    expect(scope.project).toEqual({
      name: '',
      forms: [],
      responses: []
    });

    // update and save the project
    scope.project.name = 'test';
    scope.formsJson = '[{"test":true}]';
    scope.save();

    // check if the project has been saved
    expect(projects.project).toEqual({
      name: 'test',
      forms: [{test: true}],
      responses: []
    });

    // check if location has been updated
    expect(location.path()).toBe('/project/1');
  });
});
