/* global module, element, by */

// ReSharper disable InconsistentNaming

(function () {
    
    "use strict";
    
    var AddItemDialog = function () {
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
        this.setFirstName = function (value) {
            this.firstName.sendKeys(value);
        };
        this.setLastName = function (value) {
            this.lastName.sendKeys(value);
        };
        this.setEmail = function (value) {
            this.email.sendKeys(value);
        };
        this.clearFirstName = function () {
            this.firstName.clear();
        };
        this.clearLastName = function () {
            this.lastName.clear();
        };
        this.clearEmail = function () {
            this.email.clear();
        };
    };

    module.exports = AddItemDialog;
}());
