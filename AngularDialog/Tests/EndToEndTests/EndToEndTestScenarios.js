/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-scenario.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-mocks.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("AngularDialog End-to-End Tests", function () {

        var BASE_URL = "http://" + window.location.host + "/NameList.aspx";

        var urlWithTestIdentifier = function (testIdentifier) {
            return BASE_URL + "?e2etest=" + testIdentifier;
        };

        describe("main page", function () {

            it("initially displays 2 items in the table", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                expect(window.repeater("table tbody tr").count()).toBe(2);
                expect(window.repeater("table tbody tr").row(0)).toEqual(["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
                expect(window.repeater("table tbody tr").row(1)).toEqual(["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]);
            });
        });

        describe("adding an item", function () {

            it("clicking the ok button in the AddItem dialog box appends a new item to the table", function () {
                browser().navigateTo(urlWithTestIdentifier(2));
                expect(window.repeater("table tbody tr").count()).toBe(2);
                element("#addItemBtn").click();
                input("addItemDialogModel.item.FirstName").enter("firstname3");
                input("addItemDialogModel.item.LastName").enter("lastname3");
                input("addItemDialogModel.item.Email").enter("firstname3.lastname3@gmail.com");
                element("#okBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(3);
            });

            it("item added via the AddItem dialog box has the correct values", function () {
                browser().navigateTo(urlWithTestIdentifier(2));
                element("#addItemBtn").click();
                input("addItemDialogModel.item.FirstName").enter("firstname3");
                input("addItemDialogModel.item.LastName").enter("lastname3");
                input("addItemDialogModel.item.Email").enter("firstname3.lastname3@gmail.com");
                element("#okBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(3);
                expect(window.repeater("table tbody tr").row(2)).toEqual(["3", "firstname3", "lastname3", "firstname3.lastname3@gmail.com"]);
            });

            it("clicking the cancel button in the AddItem dialog box does not append a new item to the table", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                expect(window.repeater("table tbody tr").count()).toBe(2);
                element("#addItemBtn").click();
                element("#cancelBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(2);
            });

            it("clicking the close button in the AddItem dialog box does not append a new item to the table", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                expect(window.repeater("table tbody tr").count()).toBe(2);
                element("#addItemBtn").click();
                element("#closeBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(2);
            });
        });

        describe("editing an item", function () {

            it("when an item is edited, the dialog controls are populated correctly", function() {
                browser().navigateTo(urlWithTestIdentifier(3));
                window.using("table tbody tr:nth-of-type(2)").element(".editBtn").click();
                expect(element("#firstName").val()).toBe("firstname2");
                expect(element("#lastName").val()).toBe("lastname2");
                expect(element("#email").val()).toBe("firstname2.lastname2@gmail.com");
            });
            
            it("an item can be edited", function () {
                browser().navigateTo(urlWithTestIdentifier(3));
                window.using("table tbody tr:nth-of-type(2)").element(".editBtn").click();
                input("addItemDialogModel.item.FirstName").enter("firstname2-new");
                input("addItemDialogModel.item.LastName").enter("lastname2-new");
                element("#okBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(2);
                expect(window.repeater("table tbody tr").row(0)).toEqual(["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
                expect(window.repeater("table tbody tr").row(1)).toEqual(["2", "firstname2-new", "lastname2-new", "firstname2.lastname2@gmail.com"]);
            });
        });

        describe("deleting an item", function () {

            it("item is deleted when clicking the item's Delete button and then clicking the Yes button", function () {
                browser().navigateTo(urlWithTestIdentifier(4));
                window.using("table tbody tr:nth-of-type(2)").element(".deleteBtn").click();
                element(".deleteYesBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(1);
                expect(window.repeater("table tbody tr").row(0)).toEqual(["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
            });

            it("item is not deleted when clicking the item's Delete button and then clicking the No button", function () {
                browser().navigateTo(urlWithTestIdentifier(4));
                window.using("table tbody tr:nth-of-type(2)").element(".deleteBtn").click();
                element(".deleteNoBtn").click();
                expect(window.repeater("table tbody tr").count()).toBe(2);
                expect(window.repeater("table tbody tr").row(0)).toEqual(["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
                expect(window.repeater("table tbody tr").row(1)).toEqual(["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]);
            });
        });

        describe("dialog form validation", function () {

            xit("sets focus to the first name field initially", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                element("#addItemBtn").click();
                // This expectation passes when running the e2e tests in a web browser but fails when running the e2e tests via karma.
                expect(element("#firstName:focus").count()).toBe(1);
            });

            it("hides all validation error messages initially", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                element("#addItemBtn").click();
                expect(element("div[data-ng-form] span.alert:hidden").count()).toBe(4);
                expect(element("div[data-ng-form] span[data-jt-required-field-validation-error]:hidden").count()).toBe(3);
                expect(element("div[data-ng-form] span[data-jt-email-validation-error]:hidden").count()).toBe(1);
            });

            it("displays a required field validation error message against each field when trying to submit a completely blank form", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                element("#addItemBtn").click();
                element("#okBtn").click();
                expect(element("div[data-ng-form] span[data-jt-required-field-validation-error]:visible").count()).toBe(3);
                expect(element("div[data-ng-form] span[data-jt-email-validation-error]:hidden").count()).toBe(1);
            });

            it("displays an email validation error message when trying to submit a form with an invalid email address", function () {
                browser().navigateTo(urlWithTestIdentifier(1));
                element("#addItemBtn").click();
                input("addItemDialogModel.item.FirstName").enter("firstname3");
                input("addItemDialogModel.item.LastName").enter("lastname3");
                input("addItemDialogModel.item.Email").enter("bogus");
                element("#okBtn").click();
                expect(element("div[data-ng-form] span[data-jt-email-validation-error]:visible").count()).toBe(1);
                expect(element("div[data-ng-form] span[data-jt-required-field-validation-error]:hidden").count()).toBe(3);
            });
        });
    });
} ());
