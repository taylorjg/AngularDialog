using System.Collections.Generic;

namespace AngularDialog.Domain
{
    public interface INameListRepository
    {
        IEnumerable<NameListEntry> GetAll();
        NameListEntry Get(int id);
        void Create(NameListEntry nameListEntry);
        void Update(NameListEntry nameListEntry);
        void Delete(int id);
    }
}
