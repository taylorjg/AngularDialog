// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var app = angular.module("NameListApp");

    app.service("nameListService", ["$resource", "$q", "$interpolate", "$window", function($resource, $q, $interpolate, $window) {

        var _url = $interpolate("http://{{hostname}}\\:{{port}}/Api/NameList/:id")({
            hostname: $window.location.hostname,
            port: $window.location.port
        });

        var _resource = $resource(_url, { id: "@Id" });

        this.query = function(successFn, errorFn) {
            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;
            return _resource.query(successFn, errorFn);
        };

        this.get = function(id, successFn, errorFn) {
            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;
            return _resource.get({id: id}, successFn, errorFn);
        };

        this.save = function(item, successFn, errorFn) {
            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;
            _resource.save(item, successFn, errorFn);
        };

        this.remove = function(item, successFn, errorFn) {
            successFn = successFn || angular.noop;
            errorFn = errorFn || angular.noop;
            _resource.remove({ id: item.Id }, successFn, errorFn);
        };
    }]);
} ());
