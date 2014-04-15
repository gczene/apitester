module.exports = function(config) {
  config.set({

    basePath: '../',
    files: [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/**/*.js',
      'test/unit/**/*.js'
    ],

    frameworks: ['jasmine'],
    browsers: ['Chrome'],


    autoWatch: true,
    singleRun: false,
    colors: true
  });
};
