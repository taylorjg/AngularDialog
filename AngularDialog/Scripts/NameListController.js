/// <reference path="ThirdParty/AngularJS/angular.js" />
/// <reference path="models.js" />

(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.controllers = window.nameList.controllers || {};

    var app = angular.module("NameListApp");

    app.controller("nameList.controllers.NameListController", ["$scope", "$dialog", function ($scope, $dialog) {

        $scope.nameListModel = new nameList.models.NameListModel();
        $scope.nameListModel.addItem(new nameList.models.Item("firstname1", "lastname1", "firstname1.lastname1@gmail.com"));
        $scope.nameListModel.addItem(new nameList.models.Item("firstname2", "lastname2", "firstname2.lastname2@gmail.com"));

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
