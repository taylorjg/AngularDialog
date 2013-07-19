// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = angular.module("NameListApp");

    app.service("nameListService", ["$resource", "$q", "$interpolate", "$window", function($resource, $q, $interpolate, $window) {

        var url = $interpolate("http://{{hostname}}\\:{{port}}/Api/NameList/:id")({
            hostname: $window.location.hostname,
            port: $window.location.port
        });

        var _resource = $resource(url, { id: "@Id" });

        this.query = function(successFn, errorFn) {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            return _resource.query(
                function(items) {
                    successFn(items);
                }, function(err) {
                    errorFn(err);
                });
        };

        this.get = function(id, successFn, errorFn) {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            return _resource.get(
                {
                    id: id
                },
                function(item) {
                    successFn(item);
                },
                function(err) {
                    errorFn(err);
                });
        };

        this.save = function(item, successFn, errorFn) {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            _resource.save(
                item,
                function(item2) {
                    successFn(item2);
                },
                function(err) {
                    errorFn(err);
                });
        };

        this.remove = function(item, successFn, errorFn) {

            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;

            _resource.remove(
                {
                    id: item.Id
                },
                function(x) {
                    successFn(x);
                },
                function(err) {
                    errorFn(err);
                });
        };
    }]);
} ());
