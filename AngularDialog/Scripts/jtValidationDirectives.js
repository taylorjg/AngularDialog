// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = window.angular.module("NameListApp");

    var _commonValidationErrorLinkFn = function (scope, iElement, iAttrs, $interpolate, attributeName, errorProperty) {

        var form = iElement.closest("[data-ng-form]");
        var controlSelector = iAttrs[attributeName];
        var control = form.find(controlSelector);

        var formName = $(form[0]).attr("data-name");
        var controlName = $(control[0]).attr("data-name");

        var watchExpression = $interpolate("{{formName}}.mySubmitAttempted && {{formName}}.{{controlName}}.$error.{{errorProperty}}")({
            formName: formName,
            controlName: controlName,
            errorProperty: errorProperty
        });

        scope.$watch(watchExpression, function (newValue) {
            if (newValue) {
                iElement.show();
            } else {
                iElement.hide();
            }
        });
    };

    app.directive("jtRequiredFieldValidationError", ["$interpolate", function ($interpolate) {
        return {
            restrict: "A",
            link: function (scope, iElement, iAttrs) {
                _commonValidationErrorLinkFn(scope, iElement, iAttrs, $interpolate, "jtRequiredFieldValidationError", "required");
            }
        };
    } ]);

    app.directive("jtEmailValidationError", ["$interpolate", function ($interpolate) {
        return {
            restrict: "A",
            link: function (scope, iElement, iAttrs) {
                _commonValidationErrorLinkFn(scope, iElement, iAttrs, $interpolate, "jtEmailValidationError", "email");
            }
        };
    } ]);
} ());
