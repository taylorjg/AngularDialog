/// <reference path="jasmine-1.3.1/jasmine.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-mocks.js" />
/// <reference path="../../Scripts/models.js" />
/// <reference path="../../Scripts/app.js" />
/// <reference path="../../Scripts/AddItemDialogController.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("AddItemDialogController", function () {

        var _scope;
        var _dialog;
        var _controller;

        beforeEach(function () {
            angular.mock.module("NameListApp");
        });

        beforeEach(angular.mock.inject(function ($rootScope, $controller, $dialog) {
            _scope = $rootScope.$new();
            _dialog = $dialog.dialog;
            _controller = $controller("nameList.controllers.AddItemDialogController", {
                $scope: _scope,
                dialog: _dialog
            });
        }));

        it("can construct the controller", function () {
            expect(_controller).not.toBeNull();
        });
    });
} ());
