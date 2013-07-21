/// <reference path="ThirdParty/AngularJS/angular.js" />
/// <reference path="models.js" />

(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.controllers = window.nameList.controllers || {};

    var app = angular.module("NameListApp");

    app.controller("nameList.controllers.AddItemDialogController", ["$scope", "dialog", "item", function ($scope, dialog, item) {

        $scope.addItemDialogModel = new nameList.models.AddItemDialogModel();
        $scope.addItemDialogModel.item = item;
        $scope.setFocusToFirstNameField = true;
        $scope.dialogTitle = (item.Id) ? "Edit Item " + item.Id : "Add Item";

        $scope.onCancel = function () {
            dialog.close(false);
        };

        $scope.onOk = function () {
            $scope.addItemDialogForm.mySubmitAttempted = true;
            if ($scope.addItemDialogForm.$valid) {
                dialog.close(true);
            }
        };
    } ]);
} ());
