describe('ProjectListCtrl', function () {

  'use strict';

  var scope, projects, ctrl;

  beforeEach(module('apitesterApp.controllers'));
  beforeEach(inject(function ($rootScope, $controller) {

    scope = $rootScope.$new();

    projects = {
      list: function () {
        return [1, 2, 3];
      }
    };

    ctrl = $controller('ProjectListCtrl', {
      $scope: scope,
      projects: projects
    });
  }));

  // tests ...

  it('should load the list of projects', function () {
    expect(scope.projects).toEqual(projects.list());
  });
});
