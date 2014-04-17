module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({

    jslint: {
      config: {
        src: [
          'Gruntfile.js',
          'package.json',
          'bower.json',
          '.bowerrc',
          'test/karma.conf.js',
          'test/protractor.js'
        ],
        directives: {
          node: true,
          indent: 2
        }
      },
      jasmine: {
        src: [
          'test/unit/**/*.js',
          'test/e2e/**/*.js'
        ],
        directives: {
          browser: true,
          node: true,
          unparam: true,
          indent: 2,
          predef: [
            'beforeEach', 'angular', 'inject', 'spyOn', 'describe',
            'it', 'expect', 'browser', 'element', 'by'
          ]
        }
      },
      angular: {
        src: [
          'app/scripts/*.js',
          'app/scripts/**/*.js'
        ],
        exclude: [
          'app/scripts/script.min.js'
        ],
        directives: {
          browser: true,
          unparam: true,
          indent: 2,
          predef: ['angular']
        }
      }
    },

    uglify: {
      my_target: {
        options: {
          mangle: false
        },
        files: {
          'app/scripts/script.min.js': [
            'app/scripts/app.js',
            'app/scripts/services/projects.js',
            'app/scripts/services/responses.js',
            'app/scripts/controllers/projectList.js',
            'app/scripts/controllers/newProject.js',
            'app/scripts/controllers/editProject.js',
            'app/scripts/controllers/project.js',
            'app/scripts/controllers/form.js',
            'app/scripts/controllers/responses.js'
          ]
        }
      }
    },

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          'app/styles/style.min.css': [
            'app/styles/fonts.css',
            'app/styles/less/style.less'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['jslint', 'uglify', 'less']);
};
