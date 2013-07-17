using System.Runtime.Serialization;

namespace AngularDialog.Domain
{
    [DataContract]
    public class NameListEntry
    {
        public NameListEntry(string firstName, string lastName, string email)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }

        public NameListEntry(int id, string firstName, string lastName, string email)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
        }

        [DataMember]
        public int Id { get; private set; }

        [DataMember]
        public string FirstName { get; private set; }

        [DataMember]
        public string LastName { get; private set; }

        [DataMember]
        public string Email { get; private set; }
    }
}
