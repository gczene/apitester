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

      var bar, filter;

      beforeEach(function () {
        browser.get('index.html#/project/1');
        bar = element(by.css('.projects'));
        filter = bar.element(by.model('searchText'));
      });

      describe('project list', function () {

        var projects, activeProject;

        beforeEach(function () {
          projects = bar.element.all(by.css('li a'));
          activeProject = bar.element(by.css('li.active a'));
        });

        it('should show 2 projects', function () {
          expect(projects.count()).toBe(2);
        });

        it('should be filterable', function () {
          filter.sendKeys('Updated Project Name');
          expect(projects.count()).toBe(1);
          filter.clear();
          expect(projects.count()).toBe(2);
        });

        it('should navigate between projects', function () {
          projects.get(1).click();
          expect(activeProject.getText()).toBe(projects.get(1).getText());
          projects.get(0).click();
          expect(activeProject.getText()).toBe(projects.get(0).getText());
        });
      });
    });

    describe('header', function () {

      var buttons;

      beforeEach(function () {
        browser.get('index.html#/project/1');
        buttons = element.all(by.css('header a'));
      });

      describe('first button', function () {

        var button, h1;

        beforeEach(function () {
          button = buttons.get(0);
          h1 = element(by.css('h1'));
        });

        it('should read NEW PROJECT', function () {
          expect(button.getText()).toBe('NEW PROJECT');
        });

        it('should navigate to the new project page', function () {
          button.click();
          expect(h1.getText()).toBe('Create a Project');
        });
      });

      describe('second button', function () {

        var button, h1;

        beforeEach(function () {
          button = buttons.get(1);
          h1 = element(by.css('h1'));
        });

        it('should read EDIT PROJECT', function () {
          expect(button.getText()).toBe('EDIT PROJECT');
        });

        it('should contain an edit project button', function () {
          button.click();
          expect(h1.getText()).toBe('Edit Project');
        });
      });

      describe('third button', function () {

        var button, projects;

        beforeEach(function () {
          button = buttons.get(2);
          projects = element.all(by.css('.projects a'));
        });

        it('should read DELETE PROJECT', function () {
          expect(button.getText()).toBe('DELETE PROJECT');
        });

        it('should contain a delete project button', function () {
          expect(projects.count()).toBe(2);
          button.click();
          expect(projects.count()).toBe(1);
        });
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

        it('should send API requests', function () {
          expect(responses.count()).toBe(0);

          name.sendKeys('London, UK');
          submit.click();
          expect(responses.count()).toBe(1);

          name.sendKeys('Budapest, HU');
          submit.click();
          expect(responses.count()).toBe(2);

          name.sendKeys('foobar');
          submit.click();
          expect(responses.count()).toBe(3);
        });
      });
    });

    describe('responses bar', function () {

      var bar, filter;

      beforeEach(function () {
        browser.get('index.html#/project/0');
        bar = element(by.css('.responses'));
        filter = bar.element(by.model('searchText'));
      });

      describe('response list', function () {

        var responses;

        beforeEach(function () {
          responses = bar.element.all(by.css('.response'));
        });

        it('should show 3 responses', function () {
          expect(responses.count()).toBe(3);
        });

        it('should be filterable', function () {
          filter.sendKeys('london');
          expect(responses.count()).toBe(1);
          filter.clear();
          filter.sendKeys('foobar');
          expect(responses.count()).toBe(0);
          filter.clear();
          expect(responses.count()).toBe(3);
        });

        describe('response', function () {

          var response;

          beforeEach(function () {
            response = bar.element(by.css('.responses .response'));
          });

          describe('remove button', function () {

            var removeButton;

            beforeEach(function () {
              removeButton = response.element(by.css('button'));
            });

            it('should delete a button', function () {
              expect(responses.count()).toBe(3);
              removeButton.click();
              expect(responses.count()).toBe(2);
              removeButton.click();
              expect(responses.count()).toBe(1);
              removeButton.click();
              expect(responses.count()).toBe(0);
            });
          });
        });
      });
    });
  });
});
