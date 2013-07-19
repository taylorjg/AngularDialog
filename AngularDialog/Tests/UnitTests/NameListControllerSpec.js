/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-mocks.js" />
/// <reference path="../../Scripts/models.js" />
/// <reference path="../../Scripts/app.js" />
/// <reference path="../../Scripts/NameListController.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("NameListController", function () {

        var _scope;
        var _controller;

        beforeEach(function () {
            angular.mock.module("NameListApp");
            angular.mock.inject(function ($rootScope, $controller, $httpBackend) {
                $httpBackend.whenGET(/\/Api\/NameList$/).respond([]);
                _scope = $rootScope.$new();
                _controller = $controller("nameList.controllers.NameListController", {
                    $scope: _scope
                });
            });
        });

        it("can construct the controller", function () {
            expect(_controller).toBeDefined();
        });
    });
} ());
