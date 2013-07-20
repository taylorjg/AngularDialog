// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var RequestBodyMatcher = function (nameListEntry) {
        this.test = function (requestDataString) {
            var requestDataObject = angular.fromJson(requestDataString);
            return angular.equals(requestDataObject, nameListEntry);
        };
    };

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
            "FirstName": "firstname1",
            "LastName": "lastname1",
            "Email": "firstname1.lastname1@gmail.com"
        }, {
            "Id": 2,
            "FirstName": "firstname2",
            "LastName": "lastname2",
            "Email": "firstname2.lastname2@gmail.com"
        }];

        var _getResponse = {
            "Id": 2,
            "FirstName": "firstname2",
            "LastName": "lastname2",
            "Email": "firstname2.lastname2@gmail.com"
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

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList$/).respond(_queryResponse);

            //Act
            var actual = _service.query();
            _httpBackend.flush();

            // Assert
            expect(actual).toEqualData(_queryResponse);

            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can get a single name list entry", function () {

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);

            // Act            
            var actual = _service.get(2);
            _httpBackend.flush();

            // Assert
            expect(actual).toEqualData({
                "Id": 2,
                "FirstName": "firstname2",
                "LastName": "lastname2",
                "Email": "firstname2.lastname2@gmail.com"
            });

            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can create a new name list entry", function () {

            // Arrange
            var newNameListEntry = {
                "FirstName": "F",
                "LastName": "L",
                "Email": "E"
            };

            _httpBackend.whenPOST(/\/Api\/NameList$/, new RequestBodyMatcher(newNameListEntry)).respond(200);

            // Act
            _service.save(newNameListEntry);
            _httpBackend.flush();

            // Assert
            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can update an existing name list entry via the \"$save\" instance method", function () {

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);
            var nameListEntry = _service.get(2);
            _httpBackend.flush();

            var newFirstName = nameListEntry.FirstName + "-new";
            var newLastName = nameListEntry.LastName + "-new";
            var newEmail = nameListEntry.Email + "-new";
            nameListEntry.FirstName = newFirstName;
            nameListEntry.LastName = newLastName;
            nameListEntry.Email = newEmail;

            _httpBackend.whenPOST(/\/Api\/NameList\/2$/, new RequestBodyMatcher(nameListEntry)).respond(200);

            // Act
            nameListEntry.$save();
            _httpBackend.flush();

            // Assert
            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can update an existing name list entry via the \"save\" class method", function () {

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);
            var nameListEntry = _service.get(2);
            _httpBackend.flush();

            var newFirstName = nameListEntry.FirstName + "-new";
            var newLastName = nameListEntry.LastName + "-new";
            var newEmail = nameListEntry.Email + "-new";
            nameListEntry.FirstName = newFirstName;
            nameListEntry.LastName = newLastName;
            nameListEntry.Email = newEmail;

            _httpBackend.whenPOST(/\/Api\/NameList\/2$/, new RequestBodyMatcher(nameListEntry)).respond(200);

            // Act
            _service.save(nameListEntry);
            _httpBackend.flush();

            // Assert
            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can remove an existing name list entry via the \"$remove\" instance method", function () {

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);
            var nameListEntry = _service.get(2);
            _httpBackend.flush();

            _httpBackend.whenDELETE(/\/Api\/NameList\/2$/).respond(200);

            // Act
            nameListEntry.$remove();
            _httpBackend.flush();

            // Assert
            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });

        it("can remove an existing name list entry via the \"remove\" class method", function () {

            // Arrange
            _httpBackend.whenGET(/\/Api\/NameList\/2$/).respond(_getResponse);
            var nameListEntry = _service.get(2);
            _httpBackend.flush();

            _httpBackend.whenDELETE(/\/Api\/NameList\/2$/).respond(200);

            // Act
            _service.remove(nameListEntry);
            _httpBackend.flush();

            // Assert
            _httpBackend.verifyNoOutstandingRequest();
            _httpBackend.verifyNoOutstandingExpectation();
        });
    });
} ());
