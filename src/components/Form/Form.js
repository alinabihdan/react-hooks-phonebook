import { useState } from 'react';
import shortid from 'shortid';
import s from './Form.module.css';

function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;

    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label} htmlFor={nameInputId}>
        Name:
      </label>
      <input
        className={s.input}
        onChange={handleChange}
        id={nameInputId}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={s.label} htmlFor={numberInputId}>
        Number:
      </label>
      <input
        className={s.input}
        onChange={handleChange}
        id={numberInputId}
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}

export default Form;
