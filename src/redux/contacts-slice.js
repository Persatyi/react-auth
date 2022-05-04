import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  loginContact,
  refreshUser,
  registerContact,
  logOut,
} from 'redux/contacts-thunk';

const initialState = {
  token: '',
  contacts: [],
  user: {
    name: '',
    email: '',
  },
};

const slice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    filter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [registerContact.pending]: (state, _) => {
      state.loading = true;
    },
    [registerContact.fulfilled]: (state, action) => {
      // state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      // state.contacts = action.payload;
    },
    [registerContact.rejected]: (state, action) => {
      action.payload === '404'
        ? toast.info('There are no contacts yet, please add a new contact')
        : toast.error('Oops, something went wrong, please try again');
      state.loading = false;
    },
    [loginContact.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    [refreshUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [logOut.fulfilled]: () => {
      return initialState;
    },
    // [addContact.pending]: (state, _) => {
    //   state.loading = true;
    // },
    // [addContact.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   toast.success('Success, your contact was added to list');
    //   state.contacts = [...state.contacts, action.payload];
    // },
    // [addContact.rejected]: (state, _) => {
    //   state.loading = false;
    //   toast.error('Oops, something went wrong, please try again');
    // },
    // [deleteContact.pending]: (state, _) => {
    //   state.loading = true;
    // },
    // [deleteContact.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   toast.success('Contact successfully removed from the list');
    //   state.contacts = state.contacts.filter(el => el.id !== action.meta.arg);
    // },
    // [deleteContact.rejected]: (state, _) => {
    //   state.loading = false;
    //   toast.error('Oops, something went wrong, please try again');
    // },
  },
});

export default slice;
export const { filter } = slice.actions;
