(function () {

    "use strict";

    var app = window.angular.module("NameListApp");

    app.directive("jtSetFocus", ["$timeout", function ($timeout) {
        return {
            restrict: "A",
            link: function (scope, iElement, iAttrs) {
                scope.$watch(iAttrs.jtSetFocus, function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            iElement.focus();
                        });
                    }
                });
            }
        };
    } ]);
} ());
