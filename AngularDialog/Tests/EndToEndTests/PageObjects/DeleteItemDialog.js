/* global module, element, by */

// ReSharper disable InconsistentNaming

(function () {

    "use strict";
    
    var DeleteItemDialog = function () {
        this.deleteYesBtn = element(by.css(".deleteYesBtn"));
        this.deleteNoBtn = element(by.css(".deleteNoBtn"));
    };

    module.exports = DeleteItemDialog;
}());
