import s from './Filter.module.css';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector } from 'redux/selectors';
import { filter } from 'redux/contacts-slice';

export default function Filter() {
  const dispatch = useDispatch();
  const value = useSelector(state => filterSelector(state));

  const searchHandler = e => {
    const inputValue = e.target.value.toLowerCase().trim();
    dispatch(filter(inputValue));
  };

  return (
    <Fragment>
      <input
        value={value}
        onChange={searchHandler}
        className={s.input}
        placeholder="Search contact"
      />
    </Fragment>
  );
}

Filter.propTypes = {
  searchHandler: PropTypes.func,
  value: PropTypes.string,
};
