(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.models = window.nameList.models || {};

    window.nameList.models.NameListModel = function () {
        this.items = [];
    };

    window.nameList.models.AddItemDialogModel = function () {
        this.item = {};
    };
} ());
