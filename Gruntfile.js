'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jslint: {
      client: {
        src: [
          'app/scripts/*.js',
          'app/scripts/**/*.js'
        ],
        exclude: [
          'app/scripts/script.min.js'
        ],
        directives:{
          browser: true,
          unparam: true,
          indent: 2,
          predef: [
            'angular'
          ]
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
