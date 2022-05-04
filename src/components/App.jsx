import ContactForm from 'components/ContactForm/ContactForm';
// import ContactList from 'components/ContactList/ContactList';
// import Filter from 'components/Filter/Filter';
// import Loader from 'components/Loader/Loader';
// import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { refreshUser, logOut } from 'redux/contacts-thunk';

export default function App() {
  const { token } = useSelector(state => state);
  const dispatch = useDispatch();

  const leaveSession = () => dispatch(logOut());

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <div
      style={{
        padding: '10px',
      }}
    >
      {!token ? <ContactForm /> : <h1 onClick={leaveSession}>Statr Page</h1>}
    </div>
  );
}
