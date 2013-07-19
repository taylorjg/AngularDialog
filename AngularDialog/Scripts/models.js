(function () {

    "use strict";

    window.nameList = window.nameList || {};
    window.nameList.models = window.nameList.models || {};

    window.nameList.models.Item = function (id, firstName, lastName, email) {
        if (id) {
            this.Id = id;
        }
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Email = email;
    };

    window.nameList.models.NameListModel = function () {

        this.items = [];

        this.addItem = function (item) {
            this.items.push(item);
        };
    };

    window.nameList.models.AddItemDialogModel = function () {

        this.id = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";

        this.item = function () {
            return new nameList.models.Item(
                this.id,
                this.firstName,
                this.lastName,
                this.email);
        };
    };
} ());
