describe('API Tester application', function () {

  'use strict';

  browser.get('index.html');
  browser.executeScript('window.localStorage.clear();');

  describe('new project form', function () {

    var form, name, forms, submit, project;

    beforeEach(function () {
      browser.get('index.html#/new-project');
      form = element(by.css('form'));
      name = form.element(by.model('project.name'));
      forms = form.element(by.model('formsJson'));
      submit = form.element(by.css('[type=submit]'));
      project = element(by.css('.projects .active a'));
    });

    it('should create a new project', function () {
      name.sendKeys('Test Project');
      forms.sendKeys('[]');
      submit.click();
      expect(project.isPresent()).toBe(true);
      expect(project.getText()).toBe('Test Project');
    });
  });

  describe('edit project form', function () {

    var form, name, forms, submit, project;

    beforeEach(function () {
      browser.get('index.html#/edit-project/1');
      form = element(by.css('form'));
      name = form.element(by.model('project.name'));
      forms = form.element(by.model('formsJson'));
      submit = form.element(by.css('[type=submit]'));
      project = element(by.css('.projects .active a'));
    });

    it('should update an existing project', function () {
      name.clear();
      forms.clear();
      name.sendKeys('Updated Project Name');
      forms.sendKeys('[]');
      submit.click();
      expect(project.isPresent()).toBe(true);
      expect(project.getText()).toBe('Updated Project Name');
    });
  });

  describe('project page', function () {

    describe('projects bar', function () {

      var bar, projects, filter;

      beforeEach(function () {
        browser.get('index.html#/project/1');
        bar = element(by.css('.projects'));
        projects = bar.element.all(by.css('a'));
        filter = bar.element(by.model('searchText'));
      });

      it('should show a filterable list of projects', function () {
        expect(projects.count()).toBe(2);
        filter.sendKeys('Updated Project Name');
        expect(projects.count()).toBe(1);
        filter.clear();
        expect(projects.count()).toBe(2);
      });
    });

    describe('header', function () {

      var buttons;

      beforeEach(function () {
        browser.get('index.html#/project/1');
        buttons = element.all(by.css('header a'));
      });

      it('should contain a new project button', function () {
        var h1 = element(by.css('h1'));
        expect(buttons.get(0).getText()).toBe('NEW PROJECT');
        buttons.get(0).click();
        expect(h1.getText()).toBe('Create a Project');
      });

      it('should contain an edit project button', function () {
        var h1 = element(by.css('h1'));
        expect(buttons.get(1).getText()).toBe('EDIT PROJECT');
        buttons.get(1).click();
        expect(h1.getText()).toBe('Edit Project');
      });

      it('should contain a delete project button', function () {
        var projects = element.all(by.css('.projects a'));
        expect(buttons.get(2).getText()).toBe('DELETE PROJECT');
        expect(projects.count()).toBe(2);
        buttons.get(2).click();
        expect(projects.count()).toBe(1);
      });
    });

    describe('forms', function () {

      var forms;

      beforeEach(function () {
        browser.get('index.html#/project/0');
        forms = element.all(by.css('.forms form'));
      });

      it('should show 3 forms', function () {
        expect(forms.count()).toBe(3);
      });

      describe('first form', function () {

        var form, legend, name, submit, responses;

        beforeEach(function () {
          form = element(by.css('.forms form:nth-child(1)'));
          legend = form.element(by.css('legend'));
          name = form.element(by.css('[name=q]'));
          submit = form.element(by.css('[type=submit]'));
          responses = element.all(by.css('.responses .response'));
        });

        it('should show the right legend', function () {
          expect(legend.getText()).toBe('Searching by city name');
        });

        it('should send an API request', function () {
          expect(responses.count()).toBe(0);
          name.sendKeys('London, UK');
          submit.click();
          expect(responses.count()).toBe(1);
        });
      });
    });

    describe('responses bar', function () {

      var bar, responses, filter;

      beforeEach(function () {
        browser.get('index.html#/project/0');
        bar = element(by.css('.responses'));
        responses = bar.element.all(by.css('.response'));
        filter = bar.element(by.model('searchText'));
      });

      it('should show a filterable list of responses', function () {
        expect(responses.count()).toBe(1);
        filter.sendKeys('foobar');
        expect(responses.count()).toBe(0);
        filter.clear();
        expect(responses.count()).toBe(1);
      });

      describe('response', function () {

        var response, deleteButton;

        beforeEach(function () {
          response = bar.element(by.css('.responses .response'));
          deleteButton = response.element(by.css('button'));
        });

        it('should be deletable', function () {
          expect(response.isPresent()).toBe(true);
          deleteButton.click();
          expect(response.isPresent()).toBe(false);
        });
      });
    });
  });
});
