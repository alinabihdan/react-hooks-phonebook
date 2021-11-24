import './App.css';
import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Form from './components/Form';
import Filter from './components/Filter';
import Contacts from './components/Contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      setContacts(contacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const foundNames = contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );
    const lowerName = name.toLocaleLowerCase();
    if (foundNames.includes(lowerName)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  const filteredContacts = () => {
    const lowerCasedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCasedFilter),
    );
  };

  return (
    <div className="container">
      <h1 className="mainTitle">Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={evt => setFilter(evt.target.value)} />
      <Contacts contacts={filteredContacts()} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
