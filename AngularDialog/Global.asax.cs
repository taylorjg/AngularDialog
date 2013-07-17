using System;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using AngularDialog.Api;
using AngularDialog.Domain;
using AngularDialog.Repositories;

namespace AngularDialog
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configuration.Routes.MapHttpRoute(
                "DefaultApi",
                "api/{controller}/{id}",
                new {id = RouteParameter.Optional});

            // http://blog.ploeh.dk/2012/10/03/DependencyInjectioninASP.NETWebAPIwithCastleWindsor/
            GlobalConfiguration.Configuration.Services.Replace(
                typeof(IHttpControllerActivator),
                new PoorMansCompositionRoot());
        }
    }

    internal class PoorMansCompositionRoot : IHttpControllerActivator
    {
        private static INameListRepository _nameListRepository;

        public IHttpController Create(
            HttpRequestMessage request,
            HttpControllerDescriptor controllerDescriptor,
            Type controllerType)
        {
            if (controllerType == typeof (NameListController))
            {
                if (_nameListRepository == null)
                {
                    _nameListRepository = new InMemoryNameListRepository();
                    _nameListRepository.Create(new NameListEntry("Jonathan", "Taylor", "jonathan.taylor@drllimited.co.uk"));
                    _nameListRepository.Create(new NameListEntry("Michael", "Whiteside", "michael.whiteside@drllimited.co.uk"));
                    _nameListRepository.Create(new NameListEntry("Russell", "Allen", "russell.allen@drllimited.co.uk"));
                }

                return new NameListController(_nameListRepository);
            }

            return null;
        }
    }
}
