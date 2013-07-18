using System.Collections.Generic;
using System.Web.Http;
using AngularDialog.Domain;

// http://www.kashyapas.com/2013/05/16/web-api-in-asp-net-web-forms-application/

namespace AngularDialog.Api
{
    public class NameListController : ApiController
    {
        private readonly INameListRepository _nameListRepository;

        public NameListController(INameListRepository nameListRepository)
        {
            _nameListRepository = nameListRepository;
        }

        public IEnumerable<NameListEntry> Get()
        {
            return _nameListRepository.GetAll();
        }

        public NameListEntry Get(int id)
        {
            return _nameListRepository.Get(id);
        }

        public void Post([FromBody] NameListEntry nameListEntry)
        {
            _nameListRepository.Create(nameListEntry);
        }

        public void Post(int id, [FromBody] NameListEntry nameListEntry)
        {
            _nameListRepository.Update(nameListEntry);
        }

        public void Delete(int id)
        {
            _nameListRepository.Delete(id);
        }
    }
}
