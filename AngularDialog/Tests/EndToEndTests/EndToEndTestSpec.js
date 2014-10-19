// ReSharper disable InconsistentNaming

(function(){

	"use strict";
	
	var BASE_URL = "http://localhost:58587/NameList.aspx";

	var urlWithTestIdentifier = function (testIdentifier) {
		return BASE_URL + "?e2etest=" + testIdentifier;
	};
	
	var checkNameListRows = function(expectedRows) {
	    var actualRows = [];
	    var items = element.all(by.repeater("item in nameListModel.items"));
		items.map(function (item) {
		    var actualRow = [];
		    item.all(by.css("td")).map(function (td) {
		        td.getText().then(function (text) {
		            actualRow.push(text);
		        });
		    }).then(function() {
		        actualRows.push(actualRow.slice(0, 4));
		    });
		}).then(function() {
		    expect(actualRows.length).toBe(expectedRows.length);
		    for (var i = 0; i < actualRows.length; i++) {
		        expect(actualRows[i]).toEqual(expectedRows[i]);
		    }
		});
	};

    describe("AngularDialog End-to-End Tests", function () {

        describe("main page", function() {

            it("initially displays 2 items in the table", function() {
                browser.get(urlWithTestIdentifier(1));
                checkNameListRows([
                    ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
                    ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
                ]);
            });
        });
        
        describe("adding an item", function () {

            it("clicking the ok button in the AddItem dialog box appends a new item to the table", function () {
                browser.get(urlWithTestIdentifier(2));
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
        });
    });
	
}());
