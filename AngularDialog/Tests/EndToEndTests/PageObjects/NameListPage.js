/* global module, browser, element, by */

// ReSharper disable InconsistentNaming

(function () {
    
    "use strict";
    
    var baseUrl = "http://localhost:58587/NameList.aspx";

    var urlWithTestIdentifier = function (testIdentifier) {
        return baseUrl + "?e2etest=" + testIdentifier;
    };
    
    var NameListPage = function () {
        this.nameListItems = function() {
            return element.all(by.repeater("item in nameListModel.items"));
        };
        this.addItemBtn = function() {
            return element(by.id("addItemBtn"));
        };
        this.getColumn1ForItem = function(item) {
            return item.element(by.binding("item.Id"));
        };
        this.getColumn2ForItem = function (item) {
            return item.element(by.binding("item.FirstName"));
        };
        this.getColumn3ForItem = function (item) {
            return item.element(by.binding("item.LastName"));
        };
        this.getColumn4ForItem = function (item) {
            return item.element(by.binding("item.Email"));
        };
        this.getEditBtnForItemIndex = function (itemIndex) {
            return this.nameListItems().get(itemIndex).element(by.css(".editBtn"));
        };
        this.getDeleteBtnForItemIndex = function (itemIndex) {
            return this.nameListItems().get(itemIndex).element(by.css(".deleteBtn"));
        };
        this.get = function (testIdentifier) {
            browser.get(urlWithTestIdentifier(testIdentifier));
        };
    };
    
    module.exports = NameListPage;
}());
