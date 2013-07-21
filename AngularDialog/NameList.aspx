<%@ Page Language="C#" Inherits="AngularDialog.MyPageBase" %>

<!DOCTYPE html>
<html id="ng-app" data-ng-app="<%= (IsInAngularJsEndToEndTestMode) ? "NameListAppE2E" : "NameListApp" %>">
    
    <head>
        <title>Name List</title>
        <link href="Scripts/ThirdParty/Bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css" />
        <link href="Styles/NameList.css" rel="stylesheet" type="text/css" />
        <!--[if lte IE 8]>
            <script src="Scripts/PollyFill/json2.js" type="text/javascript"></script>
        <![endif]-->
        <!--[if lt IE 9]>
            <script src="Scripts/PollyFill/html5shiv.js" type="text/javascript"></script>
        <![endif]-->
        <script src="Scripts/ThirdParty/jQuery/jquery-1.9.1.js" type="text/javascript"></script>
        <script src="Scripts/ThirdParty/Bootstrap/js/bootstrap.js" type="text/javascript"></script>
        <script src="Scripts/ThirdParty/AngularJS/angular.js" type="text/javascript"></script>
        <script src="Scripts/ThirdParty/AngularJS/angular-resource.js" type="text/javascript"></script>
        <script src="Scripts/ThirdParty/AngularUI/angular-ui.js" type="text/javascript"></script>
        <script src="Scripts/ThirdParty/AngularUIBootstrap/ui-bootstrap-tpls-0.2.0.js" type="text/javascript"></script>
        <script src="Scripts/models.js" type="text/javascript"></script>
        <script src="Scripts/app.js" type="text/javascript"></script>
        <script src="Scripts/NameListController.js" type="text/javascript"></script>
        <script src="Scripts/AddItemDialogController.js" type="text/javascript"></script>
        <script src="Scripts/NameListService.js" type="text/javascript"></script>
        <script src="Scripts/jtValidationDirectives.js" type="text/javascript"></script>
        <script src="Scripts/jtSetFocus.js" type="text/javascript"></script>
        <% if (IsInAngularJsEndToEndTestMode) { %>
            <script src="Tests/EndToEndTests/EndToEndTestHttpBackendSetup.js" type="text/javascript"></script>
            <script src="Scripts/ThirdParty/AngularJS/angular-mocks.js" type="text/javascript"></script>
        <% } %>
    </head>

    <body data-ng-controller="nameList.controllers.NameListController">
        <div class="container">
            <br/>
            <br/>
            <div class="row">
                <div class="span1"></div>
                <div class="span10">
                    <table class="table table-striped table-condensed table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr data-ng-repeat="item in nameListModel.items">
                                <td>{{item.Id}}</td>
                                <td>{{item.FirstName}}</td>
                                <td>{{item.LastName}}</td>
                                <td>{{item.Email}}</td>
                                <td>
                                    <button class="btn btn-primary btn-small editBtn" data-ng-click="onEditItem(item)">Edit</button>
                                    <button class="btn btn-danger btn-small deleteBtn" data-ng-click="onDeleteItem(item)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <hr/>
                    <button id="addItemBtn" class="btn btn-primary btn-small" data-ng-click="onAddItem()">Add Item</button>
                </div>
                <div class="span1"></div>
            </div>
        </div>
    </body>

</html>
