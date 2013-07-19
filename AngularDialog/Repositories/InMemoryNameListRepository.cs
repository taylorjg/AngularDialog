using System;
using System.Collections.Generic;
using System.Linq;
using AngularDialog.Domain;

namespace AngularDialog.Repositories
{
    public class InMemoryNameListRepository : INameListRepository
    {
        private readonly IList<NameListEntry> _records = new List<NameListEntry>();
        private int _nextId;
        private readonly object _lockObject = new object();

        public IEnumerable<NameListEntry> GetAll()
        {
            return _records.OrderBy(r => r.Id);
        }

        public NameListEntry Get(int id)
        {
            lock (_lockObject)
            {
                var oldRecord = _records.FirstOrDefault(r => r.Id == id);

                if (oldRecord == null)
                {
                    throw new InvalidOperationException(string.Format("Could not find a record with id {0}.", id));
                }

                return oldRecord;
            }
        }

        public void Create(NameListEntry nameListEntry)
        {
            lock (_lockObject)
            {
                var id = ++_nextId;
                var newRecord = new NameListEntry(
                    id,
                    nameListEntry.FirstName,
                    nameListEntry.LastName,
                    nameListEntry.Email);
                _records.Add(newRecord);
            }
        }

        public void Update(NameListEntry nameListEntry)
        {
            lock (_lockObject)
            {
                var oldRecord = _records.FirstOrDefault(r => r.Id == nameListEntry.Id);

                if (oldRecord == null)
                {
                    throw new InvalidOperationException(string.Format("Could not find a record with id {0}.", nameListEntry.Id));
                }

                var newRecord = new NameListEntry(oldRecord.Id, nameListEntry.FirstName, nameListEntry.LastName, nameListEntry.Email);
                _records.Remove(oldRecord);
                _records.Add(newRecord);
            }
        }

        public void Delete(int id)
        {
            lock (_lockObject)
            {
                var oldRecord = _records.FirstOrDefault(r => r.Id == id);

                if (oldRecord == null)
                {
                    throw new InvalidOperationException(string.Format("Could not find a record with id {0}.", id));
                }

                _records.Remove(oldRecord);
            }
        }
    }
}
