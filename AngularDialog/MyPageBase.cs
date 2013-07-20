using System.Web.Configuration;

namespace AngularDialog
{
    public class MyPageBase : System.Web.UI.Page
    {
        private static bool IsInProduction
        {
            get
            {
                var stringValue = WebConfigurationManager.AppSettings["InProduction"];
                bool boolValue;
                return !bool.TryParse(stringValue, out boolValue) || boolValue;
            }
        }

        public bool IsInAngularJsEndToEndTestMode
        {
            get
            {
                if (IsInProduction)
                {
                    return false;
                }

                var testMode = Request.QueryString["e2etest"];
                return !string.IsNullOrEmpty(testMode);
            }
        }
    }
}
