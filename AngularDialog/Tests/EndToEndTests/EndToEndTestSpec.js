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
	
		describe("main page", function () {

			it("initially displays 2 items in the table", function () {
				browser.get(urlWithTestIdentifier(1));
			    checkNameListRows([
			        ["1", "firstname1", "lastname1", "firstname1.lastname1@gmail.com"],
			        ["2", "firstname2", "lastname2", "firstname2.lastname2@gmail.com"]
			    ]);
			});
		});
	});
	
}());
