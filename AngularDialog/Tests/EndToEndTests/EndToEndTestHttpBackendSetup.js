// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var URL_REGEXP_FOR_ALL_HTML_FILES = /.*\.html/;

    var RequestBodyMatcher = function (nameListEntry) {
        this.test = function (requestDataString) {
            var requestDataObject = angular.fromJson(requestDataString);
            return angular.equals(requestDataObject, nameListEntry);
        };
    };
    
    var _queryResponse2Items = [{
        "Id": 1,
        "FirstName": "firstname1",
        "LastName": "lastname1",
        "Email": "firstname1.lastname1@gmail.com"
    }, {
        "Id": 2,
        "FirstName": "firstname2",
        "LastName": "lastname2",
        "Email": "firstname2.lastname2@gmail.com"
    }];

    var _queryResponse3Items = [{
        "Id": 1,
        "FirstName": "firstname1",
        "LastName": "lastname1",
        "Email": "firstname1.lastname1@gmail.com"
    }, {
        "Id": 2,
        "FirstName": "firstname2",
        "LastName": "lastname2",
        "Email": "firstname2.lastname2@gmail.com"
    }, {
        "Id": 3,
        "FirstName": "firstname3",
        "LastName": "lastname3",
        "Email": "firstname3.lastname3@gmail.com"
    }];

    var app = angular.module("NameListAppE2E", ["NameListApp", "ngMockE2E"]);

    app.run(["$httpBackend", function ($httpBackend) {

        $httpBackend.whenGET(URL_REGEXP_FOR_ALL_HTML_FILES).passThrough();

        if (window.location.search === "?e2etest=1") {
            $httpBackend.whenGET(/\/Api\/NameList$/).respond(_queryResponse2Items);
        }

        if (window.location.search === "?e2etest=2") {

            var queryCount = 0;
            
            $httpBackend.whenGET(/\/Api\/NameList$/).respond(function () {
                queryCount++;
                console.log("queryCount: " + queryCount);
                if (queryCount === 1) {
                    return [200, _queryResponse2Items];
                }
                if (queryCount === 2) {
                    return [200, _queryResponse3Items];
                }
                return [500];
            });

            $httpBackend.whenPOST(/\/Api\/NameList$/, new RequestBodyMatcher({
                "FirstName": "firstname3",
                "LastName": "lastname3",
                "Email": "firstname3.lastname3@gmail.com"
            })).respond(200);
        }
    } ]);
} ());
