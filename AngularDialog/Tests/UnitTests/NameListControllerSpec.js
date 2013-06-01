/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="../ThirdParty/AngularJS/angular.js" />
/// <reference path="../ThirdParty/AngularJS/angular-mocks.js" />
/// <reference path="../models.js" />
/// <reference path="../app.js" />
/// <reference path="../NameListController.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("NameListController", function () {

        var _scope;
        var _controller;

        beforeEach(function () {
            angular.mock.module("NameListApp");
        });

        beforeEach(angular.mock.inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();
            _controller = $controller("nameList.controllers.NameListController", {
                $scope: _scope
            });
        }));

        it("can construct the controller", function () {
            expect(_controller).not.toBeNull();
        });
    });
} ());
