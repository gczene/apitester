describe('Apitester Application', function () {

  'use strict';

  browser.get('index.html');

  describe('new project page', function () {

    var h1, name, formsJson, submit;

    beforeEach(function () {
      browser.get('index.html#/new-project/');
      h1 = element(by.css('h1'));
      name = element(by.model('project.name'));
      formsJson = element(by.model('formsJson'));
      submit = element(by.css('[type=submit]'));
    });

    it('should show the new project form', function () {
      expect(h1.getText()).toBe('Create a Project');
      expect(name.isPresent()).toBe(true);
      expect(formsJson.isPresent()).toBe(true);
      expect(submit.isPresent()).toBe(true);
    });

    it('should create a new project', function () {
      var projectLink;

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

    var h1, name, formsJson, submit;

    beforeEach(function () {
      browser.get('index.html#/edit-project/1');
      h1 = element(by.css('h1'));
      name = element(by.model('project.name'));
      formsJson = element(by.model('formsJson'));
      submit = element(by.css('[type=submit]'));
    });

    it('should show the edit project form', function () {
      expect(h1.getText()).toBe('Edit Project');
      expect(name.isPresent()).toBe(true);
      expect(formsJson.isPresent()).toBe(true);
      expect(submit.isPresent()).toBe(true);
    });

    it('should edit and update an existing project', function () {
      var projectLink;

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

    it('should remove a project', function () {
      var projects, removeButton;

      projects = element.all(by.css('.projects a'));
      removeButton = element(by.css('header a:last-child'));

      expect(projects.count()).toEqual(2);

      removeButton.click();

      expect(projects.count()).toEqual(1);
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

    it('should send a request', function () {
      var responses, cityName, submit;

      responses = element.all(by.css('.response'));
      cityName = element(by.css('[name=q]'));
      submit = element(by.css('.forms form:first-child [type=submit]'));

      expect(cityName.isPresent()).toBe(true);
      expect(cityName.getAttribute('value')).toBe('');
      expect(submit.isPresent()).toBe(true);

      cityName.sendKeys('London, UK');
      expect(cityName.getAttribute('value')).toBe('London, UK');

      expect(responses.count()).toEqual(0);
      submit.click();
      expect(responses.count()).toEqual(1);
    });

    it('should delete a response', function () {
      var responses, removeButton;

      responses = element.all(by.css('.response'));
      removeButton = element(by.css('.response:first-child button'));

      expect(responses.count()).toEqual(1);
      expect(removeButton.isPresent()).toBe(true);

      removeButton.click();

      expect(responses.count()).toEqual(0);
    });
  });
});
