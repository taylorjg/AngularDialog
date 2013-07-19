// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = angular.module("NameListAppE2E", ["NameListApp", "ngMockE2E"]);

    app.run(["$httpBackend", function ($httpBackend) {
        if (window.location.search === "?e2etest=1") {
            $httpBackend.whenGET(/\/Api\/NameList$/).respond([]);
        }
    } ]);
} ());
