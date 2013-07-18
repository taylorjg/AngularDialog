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
        
        nameListService.query(function (items) {
            angular.forEach(items, function(item) {
                $scope.nameListModel.addItem(new nameList.models.Item(item.FirstName, item.LastName, item.Email));
            });
        });

        $scope.onAddItem = function () {
            var dialog = $dialog.dialog({
                modalFade: true
            });
            dialog.open("AddItemDialog.html", "nameList.controllers.AddItemDialogController").then(function (item) {
                if (item) {
                    $scope.nameListModel.addItem(item);
                }
            });
        };
    } ]);
} ());
