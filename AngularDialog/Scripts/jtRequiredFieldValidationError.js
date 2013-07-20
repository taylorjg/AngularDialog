﻿// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = window.angular.module("NameListApp");

    app.directive("jtRequiredFieldValidationError", ["$interpolate", function ($interpolate) {
        return {
            restrict: "A",
            link: function (scope, iElement, iAttrs) {

                var form = iElement.closest("[data-ng-form]");
                var controlSelector = iAttrs.jtRequiredFieldValidationError;
                var control = form.find(controlSelector);

                var formName = $(form[0]).attr("data-name");
                var controlName = $(control[0]).attr("data-name");

                var watchExpression = $interpolate("{{formName}}.mySubmitAttempted && {{formName}}.{{controlName}}.$error.required")({
                    formName: formName,
                    controlName: controlName
                });

                scope.$watch(watchExpression, function (newValue) {
                    console.log("$watch function - newValue: " + newValue);
                    if (newValue) {
                        iElement.show();
                    } else {
                        iElement.hide();
                    }
                });
            }
        };
    } ]);
} ());
