// Karma configuration
// Generated on Sun Jun 02 2013 13:09:32 GMT+0100 (GMT Daylight Time)


// base path, that will be used to resolve files and exclude
basePath = "";


// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,
	"AngularDialog/Scripts/ThirdParty/AngularJS/angular.js",
	"AngularDialog/Scripts/ThirdParty/AngularJS/angular-resource.js",
	"AngularDialog/Scripts/ThirdParty/AngularJS/angular-mocks.js",
	"AngularDialog/Scripts/ThirdParty/AngularUI/angular-ui.js",
    "AngularDialog/Scripts/ThirdParty/AngularUIBootstrap/ui-bootstrap-tpls-0.2.0.js",
	"AngularDialog/Scripts/app.js", // ensure app.js is listed first to avoid "Error: No module: NameListApp"
	"AngularDialog/Scripts/*.js",
	"AngularDialog/Tests/UnitTests/*.js"
];


// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: "dots", "progress", "junit"
reporters = ["progress"];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ["PhantomJS"];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;
