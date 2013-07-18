// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = angular.module("NameListApp");

    app.service("nameListService", ["$resource", function ($resource) {

        var _resource = $resource("http://localhost:58587/Api/NameList/:id");

        this.query = function () {
            return _resource.query();
        };

        this.get = function (id) {
            return _resource.get({id: id});
        };
    } ]);
} ());
