'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jslint: {
      client: {
        src: [
          'app/scripts/*.js',
          'app/scripts/*/**.js'
        ],
        exclude: [
          'app/scripts/script.min.js'
        ],
        directives:{
          browser: true,
          unparam: true,
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
            'app/scripts/controllers/ProjectList.js',
            'app/scripts/controllers/NewProject.js',
            'app/scripts/controllers/EditProject.js',
            'app/scripts/controllers/Project.js',
            'app/scripts/controllers/Form.js',
            'app/scripts/controllers/Responses.js'
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
            'app/styles/style.less'
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
