/* global describe, beforeEach, it, expect, browser, element, by */

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    var baseUrl = "http://localhost:58587/NameList.aspx";

    var urlWithTestIdentifier = function(testIdentifier) {
        return baseUrl + "?e2etest=" + testIdentifier;
    };

    var checkNameListRows = function (nameListPage, expectedRows) {
        var actualRows = [];
        nameListPage.nameListItems.map(function(item) {
            var column1 = item.element(by.binding("item.Id"));
            var column2 = item.element(by.binding("item.FirstName"));
            var column3 = item.element(by.binding("item.LastName"));
            var column4 = item.element(by.binding("item.Email"));
            column1.getText().then(function(id) {
                column2.getText().then(function(firstName) {
                    column3.getText().then(function(lastName) {
                        column4.getText().then(function(email) {
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

    var checkNumNameListRows = function (nameListPage, expectedNumItems) {
        var actualNumItems = nameListPage.nameListItems.count();
        expect(actualNumItems).toBe(expectedNumItems);
    };

    var checkVisibilityOfElements = function(elements, expectedNumVisible, expectedNumHidden) {
        var seed = {
            numVisible: 0,
            numHidden: 0
        };
        var actual = elements.reduce(function (acc, elem) {
            return elem.isDisplayed().then(function(isDisplayed) {
                if (isDisplayed) {
                    acc.numVisible++;
                } else {
                    acc.numHidden++;
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
        this.nameListItems = element.all(by.repeater("item in nameListModel.items"));
        this.addItemBtn = element(by.id("addItemBtn"));
        this.getEditBtnForItemIndex = function (itemIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(itemIndex).element(by.css(".editBtn"));
        };
        this.getDeleteBtnForItemIndex = function(itemIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(itemIndex).element(by.css(".deleteBtn"));
        };
        this.get = function (testIdentifier) {
            browser.get(urlWithTestIdentifier(testIdentifier));
        };
    };

    var AddItemDialog = function() {
        this.firstName = element(by.model("addItemDialogModel.item.FirstName"));
        this.lastName = element(by.model("addItemDialogModel.item.LastName"));
        this.email = element(by.model("addItemDialogModel.item.Email"));
        this.inputFieldWithFocus = element(by.css("input:focus"));
        this.validationErrors = element.all(by.css("div[data-ng-form] span.alert"));
        this.requiredValidationErrors = element.all(by.css("div[data-ng-form] span[data-jt-required-field-validation-error]"));
        this.emailValidationErrors = element.all(by.css("div[data-ng-form] span[data-jt-email-validation-error]"));
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
                checkNameListRows(nameListPage, [
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("adding an item", function() {

            it("clicking the ok button in the AddItem dialog box appends a new item to the table", function() {
                nameListPage.get(2);
                checkNumNameListRows(nameListPage, 2);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("firstname3.lastname3@gmail.com");
                addItemDialog.okBtn.click();
                checkNumNameListRows(nameListPage, 3);
            });

            it("item added via the AddItem dialog box has the correct values", function() {
                nameListPage.get(2);
                checkNumNameListRows(nameListPage, 2);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("firstname3.lastname3@gmail.com");
                addItemDialog.okBtn.click();
                checkNameListRows(nameListPage, [
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"],
                    ["3", "firstname3", "lastname3", "firstname3.lastname3@gmail.com"]
                ]);
            });

            it("clicking the cancel button in the AddItem dialog box does not append a new item to the table", function() {
                nameListPage.get(1);
                checkNumNameListRows(nameListPage, 2);
                nameListPage.addItemBtn.click();
                addItemDialog.cancelBtn.click();
                checkNumNameListRows(nameListPage, 2);
            });

            it("clicking the close button in the AddItem dialog box does not append a new item to the table", function() {
                nameListPage.get(1);
                checkNumNameListRows(nameListPage, 2);
                nameListPage.addItemBtn.click();
                addItemDialog.closeBtn.click();
                checkNumNameListRows(nameListPage, 2);
            });
        });

        describe("editing an item", function() {

            it("when an item is edited, the dialog controls are populated correctly", function() {
                nameListPage.get(3);
                nameListPage.getEditBtnForItemIndex(1).click();
                expect(addItemDialog.firstName.getAttribute("value")).toBe("firstname2");
                expect(addItemDialog.lastName.getAttribute("value")).toBe("lastname2");
                expect(addItemDialog.email.getAttribute("value")).toBe("firstname2.lastname2@gmail.com");
            });

            it("an item can be edited", function() {
                nameListPage.get(3);
                nameListPage.getEditBtnForItemIndex(1).click();
                addItemDialog.clearFirstName();
                addItemDialog.clearLastName();
                addItemDialog.setFirstName("firstname2-new");
                addItemDialog.setLastName("lastname2-new");
                addItemDialog.okBtn.click();
                checkNameListRows(nameListPage, [
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2-new", "lastname2-new", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("deleting an item", function() {

            it("item is deleted when clicking the item's Delete button and then clicking the Yes button", function() {
                nameListPage.get(4);
                nameListPage.getDeleteBtnForItemIndex(1).click();
                deleteItemDialog.deleteYesBtn.click();
                checkNameListRows(nameListPage, [
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]
                ]);
            });

            it("item is not deleted when clicking the item's Delete button and then clicking the No button", function() {
                nameListPage.get(4);
                nameListPage.getDeleteBtnForItemIndex(1).click();
                deleteItemDialog.deleteNoBtn.click();
                checkNameListRows(nameListPage, [
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });

        describe("dialog form validation", function() {

            it("sets focus to the first name field initially", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                expect(addItemDialog.inputFieldWithFocus.getAttribute("id")).toBe(addItemDialog.firstName.getAttribute("id"));
            });

            it("hides all validation error messages initially", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                checkVisibilityOfElements(addItemDialog.validationErrors, 0, 4);
                checkVisibilityOfElements(addItemDialog.requiredValidationErrors, 0, 3);
                checkVisibilityOfElements(addItemDialog.emailValidationErrors, 0, 1);
            });

            it("displays a required field validation error message against each field when trying to submit a completely blank form", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                addItemDialog.okBtn.click();
                checkVisibilityOfElements(addItemDialog.requiredValidationErrors, 3, 0);
                checkVisibilityOfElements(addItemDialog.emailValidationErrors, 0, 1);
            });

            it("displays an email validation error message when trying to submit a form with an invalid email address", function() {
                nameListPage.get(1);
                nameListPage.addItemBtn.click();
                addItemDialog.setFirstName("firstname3");
                addItemDialog.setLastName("lastname3");
                addItemDialog.setEmail("bogus");
                addItemDialog.okBtn.click();
                checkVisibilityOfElements(addItemDialog.requiredValidationErrors, 0, 3);
                checkVisibilityOfElements(addItemDialog.emailValidationErrors, 1, 0);
            });
        });
    });
}());
