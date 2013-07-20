/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-scenario.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-mocks.js" />

(function () {

    "use strict";

    describe("AngularDialog End-to-End Tests", function () {

        var baseUrl = "http://" + window.location.host + "/NameList.aspx";

        var urlWithTestIdentifier = function (testIdentifier) {
            return baseUrl + "?e2etest=" + testIdentifier;
        };

        it("initially displays 2 items in the table", function () {
            browser().navigateTo(urlWithTestIdentifier(1));
            expect(window.repeater("table tbody tr").count()).toBe(2);
            expect(window.repeater("table tbody tr").row(0)).toEqual(["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
            expect(window.repeater("table tbody tr").row(1)).toEqual(["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]);
        });

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

        describe("AddItem dialog", function () {

            describe("form validation", function () {

                it("displays an error message against each field when trying to submit a completely blank form", function () {
                    browser().navigateTo(urlWithTestIdentifier(1));
                    element("#addItemBtn").click();
                    expect(element("#okBtn:enabled").count()).toBe(1);
                    element("#okBtn").click();
                    expect(element("div[data-ng-form] span.alert").count()).toBe(3);
                    // "First name is a required field."
                });

                //                it("ok button is enabled when all fields are filled and valid", function () {
                //                    browser().navigateTo(urlWithTestIdentifier(1));
                //                    element("#addItemBtn").click();
                //                    input("addItemDialogModel.firstName").enter("firstname3");
                //                    input("addItemDialogModel.lastName").enter("lastname3");
                //                    input("addItemDialogModel.email").enter("firstname3.lastname3@gmail.com");
                //                    expect(element("#okBtn:enabled").count()).toBe(1);
                //                });
            });
        });
    });

} ());
