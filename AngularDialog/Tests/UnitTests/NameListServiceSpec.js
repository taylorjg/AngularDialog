// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    describe("NameListService", function () {

        var _httpBackend;
        var _service;

        var _queryResponse = [{
            "Id": 1,
            "FirstName": "Jonathan",
            "LastName": "Taylor",
            "Email": "jonathan.taylor@drllimited.co.uk"
        }, {
            "Id": 2,
            "FirstName": "Michael",
            "LastName": "Whiteside",
            "Email": "michael.whiteside@drllimited.co.uk"
        }, {
            "Id": 3,
            "FirstName": "Russell",
            "LastName": "Allen",
            "Email": "russell.allen@drllimited.co.uk"
        }];

        var _getResponse = {
            "Id": 2,
            "FirstName": "Michael",
            "LastName": "Whiteside",
            "Email": "michael.whiteside@drllimited.co.uk"
        };

        beforeEach(function () {
            angular.mock.module("NameListApp");
            angular.mock.inject(function ($httpBackend, nameListService) {
                _httpBackend = $httpBackend;
                _service = nameListService;
            });
        });

        it("can construct the service", function () {
            expect(_service).toBeDefined();
        });

        it("can get all name list entries", function () {
            _httpBackend.whenGET(/\/Api\/NameList$/).respond(_queryResponse);
            var actual = _service.query();
            _httpBackend.flush();
            expect(actual).not.toBeNull();
            expect(angular.isArray(actual)).toBe(true);
        });

        it("can get a single name list entry", function () {
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);
            var actual = _service.get(2);
            _httpBackend.flush();
            expect(actual).toEqualData({
                "Id": 2,
                "FirstName": "Michael",
                "LastName": "Whiteside",
                "Email": "michael.whiteside@drllimited.co.uk"
            });
        });
    });
} ());
