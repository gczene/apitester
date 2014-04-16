describe('Projects Service', function () {

  'use strict';

  var store, service;

  beforeEach(module('apitesterApp.services'));

  beforeEach(inject(function (projects) {
    store = {};
    spyOn(localStorage, 'getItem').andCallFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
      store[key] = String(value);
    });
    spyOn(localStorage, 'clear').andCallFake(function () {
      store = {};
    });
    service = projects;
  }));

  it('should return one demo project', function () {
    expect(service.list().length).toBe(1);
  });

  it('should return a project by index', function () {
    expect(service.get(0)).toBe(service.list()[0]);
  });

  it('should create a new project', function () {
    var project, index;
    project = {test: true};
    index = service.save(project);
    expect(index).toBe(1);
    expect(service.get(index)).toBe(project);
    expect(store.projects).toBe(angular.toJson(service.list()));
  });

  it('should update an existing project', function () {
    var project, oldIndex, newIndex;
    project = {fresh: true};
    oldIndex = service.save(project);
    project.fresh = false;
    newIndex = service.save(project);
    expect(newIndex).toBe(oldIndex);
    expect(service.get(newIndex)).toBe(project);
    expect(store.projects).toBe(angular.toJson(service.list()));
  });

  it('should remove a project', function () {
    var project, index;
    project = {test: true};
    index = service.save(project);
    expect(service.list().length).toBe(2);
    service.remove(project);
    expect(service.list().length).toBe(1);
    expect(service.get(index)).toBe(false);
    expect(service.list().indexOf(project) === -1);
    expect(store.projects).toBe(angular.toJson(service.list()));
    service.remove(project);
    expect(service.list().length).toBe(1);
  });
});
