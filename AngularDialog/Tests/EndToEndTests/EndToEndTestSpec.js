(function() {

    "use strict";

    var baseUrl = "http://localhost:58587/NameList.aspx";

    var urlWithTestIdentifier = function(testIdentifier) {
        return baseUrl + "?e2etest=" + testIdentifier;
    };

    var checkNameListRows = function(expectedRows) {
        var actualRows = [];
        var rowElements = element.all(by.repeater("item in nameListModel.items"));
        rowElements.map(function(rowElement) {
            var column1Element = rowElement.element(by.binding("item.Id"));
            var column2Element = rowElement.element(by.binding("item.FirstName"));
            var column3Element = rowElement.element(by.binding("item.LastName"));
            var column4Element = rowElement.element(by.binding("item.Email"));
            column1Element.getText().then(function(id) {
                column2Element.getText().then(function(firstName) {
                    column3Element.getText().then(function(lastName) {
                        column4Element.getText().then(function(email) {
                            actualRows.push([id, firstName, lastName, email]);
                        });
                    });
                });
            });
        }).then(function() {
            expect(actualRows.length).toBe(expectedRows.length);
            for (var i = 0; i < actualRows.length; i++) {
                expect(actualRows[i]).toEqual(expectedRows[i]);
            }
        });
    };

    var checkNumNameListRows = function(expectedNumRows) {
        expect(element.all(by.repeater("item in nameListModel.items")).count()).toBe(expectedNumRows);
    };

    var checkVisibilityOfElements = function(locator, expectedNumVisible, expectedNumHidden) {
        var seed = {
            numVisible: 0,
            numHidden: 0
        };
        var actual = element.all(locator).reduce(function(acc, elem) {
            return elem.isDisplayed().then(function(isDisplayed) {
                if (isDisplayed)
                    acc.numVisible = acc.numVisible + 1;
                else
                    acc.numHidden = acc.numHidden + 1;
                return acc;
            });
        }, seed);
        var expected = {
            numVisible: expectedNumVisible,
            numHidden: expectedNumHidden
        };
        expect(actual).toEqual(expected);
    };

    describe("AngularDialog End-to-End Tests", function() {

        describe("main page", function() {

            it("initially displays 2 items in the table", function() {
                browser.get(urlWithTestIdentifier(1));
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("adding an item", function() {

            it("clicking the ok button in the AddItem dialog box appends a new item to the table", function() {
                browser.get(urlWithTestIdentifier(2));
                checkNumNameListRows(2);
                element(by.id("addItemBtn")).click();
                element(by.model("addItemDialogModel.item.FirstName")).sendKeys("firstname3");
                element(by.model("addItemDialogModel.item.LastName")).sendKeys("lastname3");
                element(by.model("addItemDialogModel.item.Email")).sendKeys("firstname3.lastname3@gmail.com");
                element(by.id("okBtn")).click();
                checkNumNameListRows(3);
            });

            it("item added via the AddItem dialog box has the correct values", function() {
                browser.get(urlWithTestIdentifier(2));
                checkNumNameListRows(2);
                element(by.id("addItemBtn")).click();
                element(by.model("addItemDialogModel.item.FirstName")).sendKeys("firstname3");
                element(by.model("addItemDialogModel.item.LastName")).sendKeys("lastname3");
                element(by.model("addItemDialogModel.item.Email")).sendKeys("firstname3.lastname3@gmail.com");
                element(by.id("okBtn")).click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"],
                    ["3", "firstname3", "lastname3", "firstname3.lastname3@gmail.com"]
                ]);
            });

            it("clicking the cancel button in the AddItem dialog box does not append a new item to the table", function() {
                browser.get(urlWithTestIdentifier(1));
                checkNumNameListRows(2);
                element(by.id("addItemBtn")).click();
                element(by.id("cancelBtn")).click();
                checkNumNameListRows(2);
            });

            it("clicking the close button in the AddItem dialog box does not append a new item to the table", function() {
                browser.get(urlWithTestIdentifier(1));
                checkNumNameListRows(2);
                element(by.id("addItemBtn")).click();
                element(by.id("closeBtn")).click();
                checkNumNameListRows(2);
            });
        });

        describe("editing an item", function() {

            it("when an item is edited, the dialog controls are populated correctly", function() {
                browser.get(urlWithTestIdentifier(3));
                element.all(by.repeater("item in nameListModel.items")).get(1).element(by.css(".editBtn")).click();
                expect(element(by.model("addItemDialogModel.item.FirstName")).getAttribute("value")).toBe("firstname2");
                expect(element(by.model("addItemDialogModel.item.LastName")).getAttribute("value")).toBe("lastname2");
                expect(element(by.model("addItemDialogModel.item.Email")).getAttribute("value")).toBe("firstname2.lastname2@gmail.com");
            });

            it("an item can be edited", function() {
                browser.get(urlWithTestIdentifier(3));
                element.all(by.repeater("item in nameListModel.items")).get(1).element(by.css(".editBtn")).click();
                element(by.model("addItemDialogModel.item.FirstName")).clear().sendKeys("firstname2-new");
                element(by.model("addItemDialogModel.item.LastName")).clear().sendKeys("lastname2-new");
                element(by.id("okBtn")).click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2-new", "lastname2-new", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("deleting an item", function() {

            it("item is deleted when clicking the item's Delete button and then clicking the Yes button", function() {
                browser.get(urlWithTestIdentifier(4));
                element.all(by.repeater("item in nameListModel.items")).get(1).element(by.css(".deleteBtn")).click();
                element(by.css(".deleteYesBtn")).click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]
                ]);
            });

            it("item is not deleted when clicking the item's Delete button and then clicking the No button", function() {
                browser.get(urlWithTestIdentifier(4));
                element.all(by.repeater("item in nameListModel.items")).get(1).element(by.css(".deleteBtn")).click();
                element(by.css(".deleteNoBtn")).click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("dialog form validation", function() {

            it("sets focus to the first name field initially", function() {
                browser.get(urlWithTestIdentifier(1));
                element(by.id("addItemBtn")).click();
                expect(element.all(by.css("#firstName:focus")).count()).toBe(1);
            });

            it("hides all validation error messages initially", function() {
                browser.get(urlWithTestIdentifier(1));
                element(by.id("addItemBtn")).click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span.alert"), 0, 4);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 0, 3);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 0, 1);
            });

            it("displays a required field validation error message against each field when trying to submit a completely blank form", function() {
                browser.get(urlWithTestIdentifier(1));
                element(by.id("addItemBtn")).click();
                element(by.id("okBtn")).click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 3, 0);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 0, 1);
            });

            it("displays an email validation error message when trying to submit a form with an invalid email address", function() {
                browser.get(urlWithTestIdentifier(1));
                element(by.id("addItemBtn")).click();
                element(by.model("addItemDialogModel.item.FirstName")).sendKeys("firstname3");
                element(by.model("addItemDialogModel.item.LastName")).sendKeys("lastname3");
                element(by.model("addItemDialogModel.item.Email")).sendKeys("bogus");
                element(by.id("okBtn")).click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 0, 3);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 1, 0);
            });
        });
    });
}());
