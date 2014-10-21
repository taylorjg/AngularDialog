// ReSharper disable InconsistentNaming

(function () {
    
    "use strict";
    
    var baseUrl = "http://localhost:58587/NameList.aspx";

    var urlWithTestIdentifier = function (testIdentifier) {
        return baseUrl + "?e2etest=" + testIdentifier;
    };
    
    var NameListPage = function () {
        this.nameListItems = element.all(by.repeater("item in nameListModel.items"));
        this.addItemBtn = element(by.id("addItemBtn"));
        this.getEditBtnForItemIndex = function (itemIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(itemIndex).element(by.css(".editBtn"));
        };
        this.getDeleteBtnForItemIndex = function (itemIndex) {
            return element.all(by.repeater("item in nameListModel.items")).get(itemIndex).element(by.css(".deleteBtn"));
        };
        this.get = function (testIdentifier) {
            browser.get(urlWithTestIdentifier(testIdentifier));
        };
    };
    
    module.exports = NameListPage;
}());
