module.exports = function (config) {

  'use strict';

  config.set({
    basePath: '../',
    files: [
      './app/bower_components/angular/angular.js',
      './app/bower_components/angular-route/angular-route.js',
      './app/bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/**/*.js',
      './test/unit/**/*.js'
    ],
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    urlRoot: '/__karma/',
    proxies: {'/': 'http://localhost:8000/test/unit/'},
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};
