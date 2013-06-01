(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.models = window.nameList.models || {};

    window.nameList.models.Item = function (firstName, lastName, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    };

    window.nameList.models.NameListModel = function () {

        this.items = [];

        this.addItem = function (item) {
            this.items.push(item);
        };
    };

    window.nameList.models.AddItemDialogModel = function () {

        this.firstName = "";
        this.lastName = "";
        this.email = "";

        this.item = function () {
            return new nameList.models.Item(
                this.firstName,
                this.lastName,
                this.email);
        };
    };
} ());
