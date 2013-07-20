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
        var _dialog;
        var _nameListService;
        var _controller;

        var _queryResponse = [{
            "Id": 1,
            "FirstName": "F1",
            "LastName": "L1",
            "Email": "E1"
        }];

        beforeEach(function () {
            angular.mock.module("NameListApp");
            angular.mock.inject(function ($rootScope, $controller, $dialog, nameListService) {

                _dialog = $dialog;
                _nameListService = nameListService;

                spyOn(_nameListService, "query").andReturn(_queryResponse);

                _scope = $rootScope.$new();

                _controller = $controller("nameList.controllers.NameListController", {
                    $scope: _scope,
                    $dialog: _dialog,
                    nameListService: _nameListService
                });
            });
        });

        it("can construct the controller", function () {
            expect(_controller).toBeDefined();
        });

        it("onAddItem() invokes the dialog passing an empty item", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return { then: angular.noop };
            });

            // Act
            _scope.onAddItem();

            // Assert
            expect(_dialog.dialog).toHaveBeenCalled();
            var args = _dialog.dialog.mostRecentCall.args;
            var opts = args[0];
            var actual = opts.resolve.item();
            expect(actual).toEqual({});
        });

        it("onAddItem(), when the dialog returns true, invokes nameListService.save() passing the correct item", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(true); }
                };
            });

            spyOn(_nameListService, "save");

            // Act
            _scope.onAddItem();

            // Assert
            expect(_nameListService.save).toHaveBeenCalledWith({}, jasmine.any(Function));
        });

        it("onAddItem(), when the dialog returns false, does not invoke nameListService.save()", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(false); }
                };
            });

            spyOn(_nameListService, "save");

            // Act
            _scope.onAddItem();

            // Assert
            expect(_nameListService.save).not.toHaveBeenCalled();
        });

        it("onEditItem() invokes the dialog passing the correct item", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return { then: angular.noop };
            });
            var item = {
                Id: 123,
                FirstName: "TestF",
                LastName: "TestL",
                Email: "TestE"
            };

            // Act
            _scope.onEditItem(item);

            // Assert
            expect(_dialog.dialog).toHaveBeenCalled();
            var args = _dialog.dialog.mostRecentCall.args;
            var opts = args[0];
            var actual = opts.resolve.item();
            expect(actual).toEqual(item);
        });

        it("onEditItem(), when the dialog returns true, invokes nameListService.save() passing the correct item", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(true); }
                };
            });

            spyOn(_nameListService, "save");

            var item = {
                Id: 123,
                FirstName: "TestF",
                LastName: "TestL",
                Email: "TestE"
            };

            // Act
            _scope.onEditItem(item);

            // Assert
            expect(_nameListService.save).toHaveBeenCalledWith(item, jasmine.any(Function));
        });

        it("onEditItem(), when the dialog returns false, does not invoke nameListService.save()", function () {

            // Arrange
            var dialog = { open: angular.noop };
            spyOn(_dialog, "dialog").andCallFake(function () {
                return dialog;
            });
            spyOn(dialog, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(false); }
                };
            });

            spyOn(_nameListService, "save");

            // Act
            _scope.onEditItem({});

            // Assert
            expect(_nameListService.save).not.toHaveBeenCalled();
        });

        it("onDeleteItem(), when the message box returns true, invokes nameListService.remove() passing the correct item", function () {

            // Arrange
            var messageBox = { open: angular.noop };
            spyOn(_dialog, "messageBox").andCallFake(function () {
                return messageBox;
            });
            spyOn(messageBox, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(true); }
                };
            });

            spyOn(_nameListService, "remove");

            var item = {
                Id: 123,
                FirstName: "TestF",
                LastName: "TestL",
                Email: "TestE"
            };

            // Act
            _scope.onDeleteItem(item);

            // Assert
            expect(_nameListService.remove).toHaveBeenCalledWith(item, jasmine.any(Function));
        });

        it("onDeleteItem(), when the message box returns false, does not invoke nameListService.remove()", function () {

            // Arrange
            var messageBox = { open: angular.noop };
            spyOn(_dialog, "messageBox").andCallFake(function () {
                return messageBox;
            });
            spyOn(messageBox, "open").andCallFake(function () {
                return {
                    then: function (fn) { fn(false); }
                };
            });

            spyOn(_nameListService, "remove");

            var item = {
                Id: 123,
                FirstName: "TestF",
                LastName: "TestL",
                Email: "TestE"
            };

            // Act
            _scope.onDeleteItem(item);

            // Assert
            expect(_nameListService.remove).not.toHaveBeenCalled();
        });
    });
} ());
