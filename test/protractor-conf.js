exports.config = {
  allScriptsTimeout: 11000,
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },
  framework: 'jasmine',
  capabilities: {
    'browserName': 'chrome'
  },
  baseUrl: 'http://localhost:8000/app/',
  specs: [
    'e2e/*.js'
  ]
};