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
            angular.mock.inject(function ($rootScope, $controller, $dialog) {

                _scope = $rootScope.$new();
                _scope.addItemDialogForm = {};

                _dialog = $dialog.dialog();

                _controller = $controller("nameList.controllers.AddItemDialogController", {
                    $scope: _scope,
                    dialog: _dialog,
                    item: {}
                });
            });
        });

        it("can construct the controller", function () {
            expect(_controller).toBeDefined();
        });

        it("onCancel() invokes dialog.close() passing false", function () {

            // Arrange
            spyOn(_dialog, "close");

            // Act
            _scope.onCancel();

            // Assert
            expect(_dialog.close).toHaveBeenCalledWith(false);
        });

        it("onOk() invokes dialog.close() passing true when the form is valid", function () {

            // Arrange
            _scope.addItemDialogForm.$valid = true;
            spyOn(_dialog, "close");

            // Act
            _scope.onOk();

            // Assert
            expect(_dialog.close).toHaveBeenCalledWith(true);
        });

        it("onOk() does not invoke dialog.close() when the form is invalid", function () {

            // Arrange
            _scope.addItemDialogForm.$valid = false;
            spyOn(_dialog, "close");

            // Act
            _scope.onOk();

            // Assert
            expect(_dialog.close).not.toHaveBeenCalled();
        });
    });
} ());
