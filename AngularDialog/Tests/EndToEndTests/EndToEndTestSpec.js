/* global describe, beforeEach, it, expect, browser, element, by */

// ReSharper disable InconsistentNaming

(function () {

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
                if (isDisplayed) {
                    acc.numVisible = acc.numVisible + 1;
                } else {
                    acc.numHidden = acc.numHidden + 1;
                }
                return acc;
            });
        }, seed);
        var expected = {
            numVisible: expectedNumVisible,
            numHidden: expectedNumHidden
        };
        expect(actual).toEqual(expected);
    };

    var NameListPage = function() {
        this.addItemBtn = element(by.id("addItemBtn"));
        this.getEditBtnForRowIndex = function(rowIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(rowIndex).element(by.css(".editBtn"));
        };
        this.getDeleteBtnForRowIndex = function(rowIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(rowIndex).element(by.css(".deleteBtn"));
        };
        this.get = function (testIdentifier) {
            browser.get(urlWithTestIdentifier(testIdentifier));
        };
    };

    var AddItemDialog = function() {
        this.firstName = element(by.model("addItemDialogModel.item.FirstName"));
        this.lastName = element(by.model("addItemDialogModel.item.LastName"));
        this.email = element(by.model("addItemDialogModel.item.Email"));
        this.okBtn = element(by.id("okBtn"));
        this.cancelBtn = element(by.id("cancelBtn"));
        this.closeBtn = element(by.id("closeBtn"));
        this.setFirstName = function(value) {
            this.firstName.sendKeys(value);
        };
        this.setLastName = function(value) {
            this.lastName.sendKeys(value);
        };
        this.setEmail = function(value) {
            this.email.sendKeys(value);
        };
        this.clearFirstName = function() {
            this.firstName.clear();
        };
        this.clearLastName = function() {
            this.lastName.clear();
        };
        this.clearEmail = function() {
            this.email.clear();
        };
    };

    var DeleteItemDialog = function() {
        this.deleteYesBtn = element(by.css(".deleteYesBtn"));
        this.deleteNoBtn = element(by.css(".deleteNoBtn"));
    };

    describe("AngularDialog End-to-End Tests", function () {

        var nameListPage;
        var addItemDialog;
        var deleteItemDialog;

        beforeEach(function() {
            nameListPage = new NameListPage();
            addItemDialog = new AddItemDialog();
            deleteItemDialog = new DeleteItemDialog();
        });

        describe("main page", function() {

            it("initially displays 2 items in the table", function () {
                nameListPage.get(1);
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("adding an item", function() {

            it("clicking the ok button in the AddItem dialog box appends a new item to the table", function() {
                nameListPage.get(2);
                checkNumNameListRows(2);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("firstname3.lastname3@gmail.com");
                addItemDialog.okBtn.click();
                checkNumNameListRows(3);
            });

            it("item added via the AddItem dialog box has the correct values", function() {
                nameListPage.get(2);
                checkNumNameListRows(2);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("firstname3.lastname3@gmail.com");
                addItemDialog.okBtn.click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"],
                    ["3", "firstname3", "lastname3", "firstname3.lastname3@gmail.com"]
                ]);
            });

            it("clicking the cancel button in the AddItem dialog box does not append a new item to the table", function() {
                nameListPage.get(1);
                checkNumNameListRows(2);
                nameListPage.addItemBtn.click();
                addItemDialog.cancelBtn.click();
                checkNumNameListRows(2);
            });

            it("clicking the close button in the AddItem dialog box does not append a new item to the table", function() {
                nameListPage.get(1);
                checkNumNameListRows(2);
                nameListPage.addItemBtn.click();
                addItemDialog.closeBtn.click();
                checkNumNameListRows(2);
            });
        });

        describe("editing an item", function() {

            it("when an item is edited, the dialog controls are populated correctly", function() {
                nameListPage.get(3);
                nameListPage.getEditBtnForRowIndex(1).click();
                expect(addItemDialog.firstName.getAttribute("value")).toBe("firstname2");
                expect(addItemDialog.lastName.getAttribute("value")).toBe("lastname2");
                expect(addItemDialog.email.getAttribute("value")).toBe("firstname2.lastname2@gmail.com");
            });

            it("an item can be edited", function() {
                nameListPage.get(3);
                nameListPage.getEditBtnForRowIndex(1).click();
                addItemDialog.clearFirstName();
                addItemDialog.clearLastName();
                addItemDialog.setFirstName("firstname2-new");
                addItemDialog.setLastName("lastname2-new");
                addItemDialog.okBtn.click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2-new", "lastname2-new", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("deleting an item", function() {

            it("item is deleted when clicking the item's Delete button and then clicking the Yes button", function() {
                nameListPage.get(4);
                nameListPage.getDeleteBtnForRowIndex(1).click();
                deleteItemDialog.deleteYesBtn.click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]
                ]);
            });

            it("item is not deleted when clicking the item's Delete button and then clicking the No button", function() {
                nameListPage.get(4);
                nameListPage.getDeleteBtnForRowIndex(1).click();
                deleteItemDialog.deleteNoBtn.click();
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("dialog form validation", function() {

            it("sets focus to the first name field initially", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                expect(element.all(by.css("#firstName:focus")).count()).toBe(1);
            });

            it("hides all validation error messages initially", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span.alert"), 0, 4);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 0, 3);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 0, 1);
            });

            it("displays a required field validation error message against each field when trying to submit a completely blank form", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                addItemDialog.okBtn.click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 3, 0);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 0, 1);
            });

            it("displays an email validation error message when trying to submit a form with an invalid email address", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("bogus");
                addItemDialog.okBtn.click();
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"), 0, 3);
                checkVisibilityOfElements(by.css("div[data-ng-form] span[data-jt-email-validation-error]"), 1, 0);
            });
        });
    });
}());
