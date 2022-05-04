export const contactsSelector = state => {
  return state.contacts;
};

export const filterSelector = state => {
  return state.filter;
};

export const filteredContactsSelector = state => {
  const contacts = contactsSelector(state);
  const filter = filterSelector(state);
  return contacts?.filter(el => el.name.toLowerCase().includes(filter));
};
