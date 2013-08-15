
## Original Goal

A colleague was having difficulty writing an AngularJS end-to-end test that involved a dialog
(via the UI Bootstrap $dialog service). The problem was that after doing an element(...).click() to
open the dialog, he then seemed to have a timing issue when trying to access the controls on the dialog.

I started this little project to examine this issue in isolation (my colleague's app had a lot of things going on so it was hard to concentrate on just this one aspect). So my app has a table showing 
a list of basic contact details - firstname, lastname and email address. It has an Add button which opens a dialog where new contact details can be entered. Oddly, the end-to-end tests in my app seemed to work just fine!

My colleague eventually found the problem by comparing his code to mine. It turned out to be caused by the location of the ng-app directive. He originally had it on the &lt;body&gt; element. Moving it to the &lt;html&gt; element fixed the issue.

## Additional Features

Once the original problem was fixed, I decided to extend the scope of the project. I added the following features:

* Form validation
* RESTful service implemented using Web API (in a Web Forms application!)
* $resource based service to consume the RESTful service
* Unit tests
    * Using a web browser as the runner
    * Using karma as the runner
* End-to-end tests
    * Using a web browser as the runner
    * Using karma as the runner

## Screenshots

The following screenshot shows the main page with its table of contact details:

![Screenshot1](https://raw.github.com/taylorjg/AngularDialog/master/Images/AngularDialog_screenshot1.png)

The following screenshot shows an item being edited:

![Screenshot2](https://raw.github.com/taylorjg/AngularDialog/master/Images/AngularDialog_screenshot2.png)

The following screenshot shows validation errors whilst trying to add an item with some blank fields:

![Screenshot3](https://raw.github.com/taylorjg/AngularDialog/master/Images/AngularDialog_screenshot3.png)

The following screenshot shows the unit tests running via Karma:

![Screenshot4](https://raw.github.com/taylorjg/AngularDialog/master/Images/AngularDialog_screenshot4.png)

The following screenshot shows the end-to-end tests running via Karma:

![Screenshot5](https://raw.github.com/taylorjg/AngularDialog/master/Images/AngularDialog_screenshot5.png)

## Links

* [http://angular-ui.github.io/bootstrap/#/dialog](http://angular-ui.github.io/bootstrap/#/dialog "UI Bootstrap $dialog service")
* [http://www.kashyapas.com/2013/05/16/web-api-in-asp-net-web-forms-application/](http://www.kashyapas.com/2013/05/16/web-api-in-asp-net-web-forms-application/ "Web API in ASP.NET Web Forms Application")
* [http://blog.ploeh.dk/2012/09/28/DependencyInjectionandLifetimeManagementwithASP.NETWebAPI/](http://blog.ploeh.dk/2012/09/28/DependencyInjectionandLifetimeManagementwithASP.NETWebAPI/ "Dependency Injection and Lifetime Management with ASP.NET Web API")
* [http://blog.ploeh.dk/2012/10/03/DependencyInjectioninASP.NETWebAPIwithCastleWindsor/](http://blog.ploeh.dk/2012/10/03/DependencyInjectioninASP.NETWebAPIwithCastleWindsor/ "Dependency Injection in ASP.NET Web API with Castle Windsor")
