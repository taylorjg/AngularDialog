/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-scenario.js" />
/// <reference path="../../Scripts/ThirdParty/AngularJS/angular-mocks.js" />

(function () {

    "use strict";

    describe("AngularDialog End-to-End Tests", function () {

        // This URL is for AngularDialog running under the Visual Studio
        // web development server (Cassini). The port number is assigned
        // in the "Web" section of the AngularDialog project's properties
        // (see the "Specific port" setting).
        var baseUrl = "http://localhost:58587/NameList.html";

        it("initially displays 2 items in the table", function () {
            browser().navigateTo(baseUrl);
            expect(window.repeater("table tbody tr").count()).toBe(2);
            expect(window.repeater("table tbody tr").row(0)).toEqual(["firstname1", "lastname1", "firstname1.lastname1@gmail.com"]);
            expect(window.repeater("table tbody tr").row(1)).toEqual(["firstname2", "lastname2", "firstname2.lastname2@gmail.com"]);
        });

        it("clicking the ok button in the AddItem dialog box appends a new item to the table", function () {
            browser().navigateTo(baseUrl);
            expect(window.repeater("table tbody tr").count()).toBe(2);
            element("#addItemBtn").click();
            input("addItemDialogModel.firstName").enter("firstname3");
            input("addItemDialogModel.lastName").enter("lastname3");
            input("addItemDialogModel.email").enter("firstname3.lastname3@gmail.com");
            element("#okBtn").click();
            expect(window.repeater("table tbody tr").count()).toBe(3);
        });

        it("item added via the AddItem dialog box has the correct values", function () {
            browser().navigateTo(baseUrl);
            element("#addItemBtn").click();
            input("addItemDialogModel.firstName").enter("firstname3");
            input("addItemDialogModel.lastName").enter("lastname3");
            input("addItemDialogModel.email").enter("firstname3.lastname3@gmail.com");
            element("#okBtn").click();
            expect(window.repeater("table tbody tr").count()).toBe(3);
            expect(window.repeater("table tbody tr").row(2)).toEqual(["firstname3", "lastname3", "firstname3.lastname3@gmail.com"]);
        });

        it("clicking the cancel button in the AddItem dialog box does not append a new item to the table", function () {
            browser().navigateTo(baseUrl);
            expect(window.repeater("table tbody tr").count()).toBe(2);
            element("#addItemBtn").click();
            element("#cancelBtn").click();
            expect(window.repeater("table tbody tr").count()).toBe(2);
        });

        it("clicking the close button in the AddItem dialog box does not append a new item to the table", function () {
            browser().navigateTo(baseUrl);
            expect(window.repeater("table tbody tr").count()).toBe(2);
            element("#addItemBtn").click();
            element("#closeBtn").click();
            expect(window.repeater("table tbody tr").count()).toBe(2);
        });

        describe("AddItem dialog", function () {
            
            describe("form validation", function () {

                describe("ok button", function () {

//                    it("is disabled when all input fields are blank", function () {
//                        browser().navigateTo(baseUrl);
//                        element("#addItemBtn").click();
//                        expect(element("#okBtn:enabled").count()).toBe(0);
//                    });

//                    it("is disabled when lastname and email fields are blank", function () {
//                        browser().navigateTo(baseUrl);
//                        element("#addItemBtn").click();
//                        input("addItemDialogModel.firstName").enter("firstname3");
//                        expect(element("#okBtn:enabled").count()).toBe(0);
//                    });

//                    it("is disabled when email field is blank", function () {
//                        browser().navigateTo(baseUrl);
//                        element("#addItemBtn").click();
//                        input("addItemDialogModel.firstName").enter("firstname3");
//                        input("addItemDialogModel.lastName").enter("lastname3");
//                        expect(element("#okBtn:enabled").count()).toBe(0);
//                    });

//                    it("is disabled when all fields are filled but email is invalid", function () {
//                        browser().navigateTo(baseUrl);
//                        element("#addItemBtn").click();
//                        input("addItemDialogModel.firstName").enter("firstname3");
//                        input("addItemDialogModel.lastName").enter("lastname3");
//                        input("addItemDialogModel.email").enter("bogus-email-address");
//                        expect(element("#okBtn:enabled").count()).toBe(0);
//                    });

                    it("is enabled when all fields are filled and valid", function () {
                        browser().navigateTo(baseUrl);
                        element("#addItemBtn").click();
                        input("addItemDialogModel.firstName").enter("firstname3");
                        input("addItemDialogModel.lastName").enter("lastname3");
                        input("addItemDialogModel.email").enter("firstname3.lastname3@gmail.com");
                        expect(element("#okBtn:enabled").count()).toBe(1);
                    });
                });
            });
        });
    });

//    var notImplemented = function (test) {
//        var future = test.addFutureAction("not implemented", function (appWindow, $document, done) {
//            done(null, "not implemented");
//        });
//        expect(future).toBe("this test to be implemented");
//    };
//    
} ());
