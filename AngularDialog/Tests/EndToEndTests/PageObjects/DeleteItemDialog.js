/* global module, element, by */

// ReSharper disable InconsistentNaming

(function () {

    "use strict";
    
    var DeleteItemDialog = function () {
        this.deleteYesBtn = function() {
            return element(by.css(".deleteYesBtn"));
        }
        this.deleteNoBtn = function() {
            return element(by.css(".deleteNoBtn"));
        }
    };

    module.exports = DeleteItemDialog;
}());
