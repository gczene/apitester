describe('Apitester Application', function () {

  'use strict';

  browser.get('index.html');

  describe('new project page', function () {

    beforeEach(function () {
      browser.get('index.html#/new-project/');
    });

    it('should show the new project form', function () {
      expect(element(by.css('h1')).getText()).toBe('Create a Project');
      expect(element(by.model('project.name')).isPresent()).toBe(true);
      expect(element(by.model('formsJson')).isPresent()).toBe(true);
      expect(element(by.css('[type=submit]')).isPresent()).toBe(true);
    });

    it('should create a new project', function () {
      var name, formsJson, submit, projectLink;

      name = element(by.model('project.name'));
      formsJson = element(by.model('formsJson'));
      submit = element(by.css('[type=submit]'));

      expect(name.getAttribute('value')).toBe('');
      expect(formsJson.getAttribute('value')).toBe('');

      name.sendKeys('Test Project 001');
      formsJson.sendKeys('[]');
      expect(name.getAttribute('value')).toBe('Test Project 001');
      expect(formsJson.getAttribute('value')).toBe('[]');

      submit.click();
      projectLink = element(by.css('.projects .active a'));
      expect(projectLink.isPresent()).toBe(true);
      expect(projectLink.getText()).toBe('Test Project 001');
    });
  });

  describe('edit project page', function () {

    beforeEach(function () {
      browser.get('index.html#/edit-project/1');
    });

    it('should show the edit project form', function () {
      expect(element(by.css('h1')).getText()).toBe('Edit Project');
      expect(element(by.model('project.name')).isPresent()).toBe(true);
      expect(element(by.model('formsJson')).isPresent()).toBe(true);
      expect(element(by.css('[type=submit]')).isPresent()).toBe(true);
    });

    it('should edit and update an existing project', function () {
      var name, formsJson, submit, projectLink;

      name = element(by.model('project.name'));
      formsJson = element(by.model('formsJson'));
      submit = element(by.css('[type=submit]'));

      expect(name.getAttribute('value')).toBe('Test Project 001');
      expect(formsJson.getAttribute('value')).toBe('[]');

      name.clear();
      formsJson.clear();
      expect(name.getAttribute('value')).toBe('');
      expect(formsJson.getAttribute('value')).toBe('');

      name.sendKeys('Test Project 002');
      formsJson.sendKeys('[]');
      expect(name.getAttribute('value')).toBe('Test Project 002');
      expect(formsJson.getAttribute('value')).toBe('[]');

      submit.click();
      projectLink = element(by.css('.projects .active a'));
      expect(projectLink.isPresent()).toBe(true);
      expect(projectLink.getText()).toBe('Test Project 002');
    });
  });

  describe('project page', function () {

    beforeEach(function () {
      browser.get('index.html#/project/1');
    });

    it('should should the list of projects', function () {
      var buttons = element.all(by.css('.projects li'));
      expect(buttons.count()).toEqual(2);
    });

    it('should show the navigation buttons', function () {
      var buttons = element.all(by.css('header a'));
      expect(buttons.count()).toEqual(3);
      expect(buttons.get(0).isDisplayed()).toBe(true);
      expect(buttons.get(1).isDisplayed()).toBe(true);
      expect(buttons.get(2).isDisplayed()).toBe(true);
    });
  });

  describe('demo project page', function () {

    beforeEach(function () {
      browser.get('index.html#/project/0');
    });

    it('should show the navigation buttons', function () {
      var buttons = element.all(by.css('header a'));
      expect(buttons.count()).toEqual(3);
      expect(buttons.get(0).isDisplayed()).toBe(true);
      expect(buttons.get(1).isDisplayed()).toBe(true);
      expect(buttons.get(2).isDisplayed()).toBe(false);
    });

    it('should show the demo forms', function () {
      var forms = element.all(by.css('.forms form'));
      expect(forms.count()).toEqual(3);
    });
  });
});
