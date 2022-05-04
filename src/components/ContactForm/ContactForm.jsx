import s from './ContactForm.module.css';
import { Fragment, useReducer } from 'react';
import data from 'db/input.json';
import { registerContact, loginContact } from 'redux/contacts-thunk';
// import { nanoid } from 'nanoid';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import { addContact } from 'redux/contacts-thunk';
// import { toast } from 'react-toastify';

export default function ContactForm() {
  const dispatch = useDispatch();
  // const contacts = useSelector(state => state.contacts);

  const initialState = {
    name: '',
    password: '',
    email: '',
  };

  const initialTypes = {
    name: 'name',
    password: 'password',
    reset: 'reset',
    email: 'email',
  };

  const [state, dispatchLocal] = useReducer(reducer, initialState);

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case initialTypes.name:
        return { ...state, name: payload };
      case initialTypes.password:
        return { ...state, password: payload };
      case initialTypes.reset:
        return initialState;
      case initialTypes.email:
        return { ...state, email: payload };
      default:
        return state;
    }
  }

  const controlTheInput = e => {
    const { value, name } = e.target;
    dispatchLocal({ type: name, payload: value });
  };

  const login = () => {
    const contact = { email: state.email, password: state.password };
    dispatch(loginContact(contact));
  };

  const addContactOnSubmit = e => {
    e.preventDefault();

    dispatch(registerContact(state));

    // const ifName = contacts.find(
    //   el => el.name.toLowerCase() === contact.name.toLowerCase()
    // );

    // if (ifName) {
    //   toast.info(`${ifName.name} is already exist, please type new name`);
    //   return;
    // }

    // const ifNumber = contacts.find(
    //   el => el.number.replaceAll('-', '') === contact.number.replaceAll('-', '')
    // );

    // if (ifNumber) {
    //   toast.info(`${ifNumber.number} is already exist, please type new number`);
    //   return;
    // }

    // dispatch(addContact(contact));
    dispatchLocal({ type: 'reset' });
  };

  const keysArr = Object.keys(initialState);
  return (
    <form className={s.form} onSubmit={addContactOnSubmit}>
      {keysArr.map(key => {
        const { id, type, name, pattern, title } = data[key];
        return (
          <Fragment key={id}>
            <label className={s.label} htmlFor={id}>
              {name}
            </label>
            <input
              onChange={controlTheInput}
              value={state[key]}
              id={id}
              className={s.input}
              type={type}
              name={name}
              pattern={pattern}
              title={title}
              required
            />
          </Fragment>
        );
      })}
      <button className={s.button} type="submit">
        Registration
      </button>
      <button className={s.button} type="button" onClick={login}>
        Login
      </button>
    </form>
  );
}

// ContactForm.propTypes = {
//   addContactOnSubmit: PropTypes.func,
//   keysArr: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//       type: PropTypes.string,
//       name: PropTypes.string,
//       pattern: PropTypes.string,
//       title: PropTypes.string,
//     })
//   ),
// };
