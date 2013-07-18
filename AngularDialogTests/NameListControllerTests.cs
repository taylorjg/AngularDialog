using System.Collections.Generic;
using System.Linq;
using AngularDialog.Api;
using AngularDialog.Domain;
using AngularDialog.Repositories;
using NUnit.Framework;

namespace AngularDialogTests
{
    [TestFixture]
    class NameListControllerTests
    {
        private NameListController _nameListController;

        [SetUp]
        public void SetUp()
        {
            var nameListRepository = new InMemoryNameListRepository();

            var cannedData = new[]
                {
                    new NameListEntry("F1", "L1", "E1"),
                    new NameListEntry("F2", "L2", "E2"),
                    new NameListEntry("F3", "L3", "E3")
                };

            foreach (var item in cannedData)
            {
                nameListRepository.Create(item);
            }

            _nameListController = new NameListController(nameListRepository);
        }

        [Test]
        public void CanGetAllItemsInTheRepository()
        {
            var actual = _nameListController.Get().ToList();

            CheckRepositoryContents(
                actual,
                new[]
                    {
                        new NameListEntry("F1", "L1", "E1"),
                        new NameListEntry("F2", "L2", "E2"),
                        new NameListEntry("F3", "L3", "E3")
                    });
        }

        [Test]
        public void CanGetAnExistingItemById()
        {
            var actual = _nameListController.Get(2);
            Assert.That(actual.Id, Is.EqualTo(2));
        }

        [Test]
        public void AttemptingToGetANonExistentItemThrowsAnException()
        {
            Assert.Throws<System.InvalidOperationException>(() => _nameListController.Get(99));
        }

        [Test]
        public void CanCreateANewItem()
        {
            var newItem = new NameListEntry(
                "F-new",
                "L-new",
                "E-new");

            _nameListController.Post(newItem);

            var actual = _nameListController.Get().ToList();

            CheckRepositoryContents(
                actual,
                new[]
                    {
                        new NameListEntry("F1", "L1", "E1"),
                        new NameListEntry("F2", "L2", "E2"),
                        new NameListEntry("F3", "L3", "E3"),
                        new NameListEntry("F-new", "L-new", "E-new")
                    });
        }

        [Test]
        public void CanUpdateAnExistingItem()
        {
            var oldItem = _nameListController.Get(2);
            var newItem = new NameListEntry(
                oldItem.Id,
                "F2-new",
                "L2-new",
                "E2-new");
            _nameListController.Post(newItem.Id, newItem);

            var actual = _nameListController.Get().ToList();

            CheckRepositoryContents(
                actual,
                new[]
                    {
                        new NameListEntry("F1", "L1", "E1"),
                        new NameListEntry("F2-new", "L2-new", "E2-new"),
                        new NameListEntry("F3", "L3", "E3")
                    });
        }

        [Test]
        public void AttemptingToUpdateANonExistentItemThrowsAnException()
        {
            var newItem = new NameListEntry(
                99,
                "F99-new",
                "L99-new",
                "E99-new");
            Assert.Throws<System.InvalidOperationException>(() => _nameListController.Post(newItem.Id, newItem));
        }

        [Test]
        public void CanDeleteAnExistingItemById()
        {
            _nameListController.Delete(2);

            var actual = _nameListController.Get().ToList();

            CheckRepositoryContents(
                actual,
                new[]
                    {
                        new NameListEntry("F1", "L1", "E1"),
                        new NameListEntry("F3", "L3", "E3")
                    });
        }

        [Test]
        public void AttemptingToDeleteANonExistentItemThrowsAnException()
        {
            Assert.Throws<System.InvalidOperationException>(() => _nameListController.Delete(99));
        }

        private static void CheckRepositoryContents(ICollection<NameListEntry> actual, ICollection<NameListEntry> expected)
        {
            Assert.That(actual.Count, Is.EqualTo(expected.Count));

            foreach (var e in expected)
            {
                // ReSharper disable ReturnValueOfPureMethodIsNotUsed
                actual.Single(x =>
                              x.FirstName == e.FirstName &&
                              x.LastName == e.LastName &&
                              x.Email == e.Email);
                // ReSharper restore ReturnValueOfPureMethodIsNotUsed
            }
        }
    }
}
