/// <reference path="ThirdParty/AngularJS/angular.js" />
/// <reference path="models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.controllers = window.nameList.controllers || {};

    var app = angular.module("NameListApp");

    app.controller("nameList.controllers.NameListController", ["$scope", "$dialog", "nameListService", function ($scope, $dialog, nameListService) {

        $scope.nameListModel = new nameList.models.NameListModel();
        $scope.nameListModel.items = nameListService.query();

        $scope.onAddItem = function () {
            var dialog = $dialog.dialog({
                modalFade: true,
                resolve: {
                    item: function () {
                        return new window.nameList.models.Item();
                    }
                }
            });
            dialog.open("AddItemDialog.html", "nameList.controllers.AddItemDialogController").then(function (modifiedItem) {
                if (modifiedItem) {
                    nameListService.save(modifiedItem, function () {
                        $scope.nameListModel.items = nameListService.query();
                    });
                }
            });
        };

        $scope.onEditItem = function (item) {
            var dialog = $dialog.dialog({
                modalFade: true,
                resolve: {
                    item: function () {
                        return item;
                    }
                }
            });
            dialog.open("AddItemDialog.html", "nameList.controllers.AddItemDialogController").then(function (modifiedItem) {
                if (modifiedItem) {
                    nameListService.save(modifiedItem, function () {
                        $scope.nameListModel.items = nameListService.query();
                    });
                }
            });
        };

        $scope.onDeleteItem = function (item) {
            nameListService.remove(item.Id, function () {
                $scope.nameListModel.items = nameListService.query();
            });
        };
    } ]);
} ());
