/* global module */

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({

        jshint: {
            options: grunt.file.readJSON(".jshintrc"),
            files: [
                "Gruntfile.js",
                "AngularDialog/Scripts/*.js",
                "AngularDialog/Tests/EndToEndTests/*.js",
                "AngularDialog/Tests/UnitTests/*.js"
            ]
        },

        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["jshint"]);
};
