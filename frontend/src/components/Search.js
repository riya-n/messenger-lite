/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';

import {
  InputBox, List, SearchElement, ActionButton,
} from '../styles';

const Search = (props) => {
  const { setOtherUser, setSearching, searching } = props;
  const [searchStr, setSearchStr] = useState('');
  const [users, setUsers] = useState([]);

  const onSearch = async () => {
    setSearching(true);
    await axios.get('/api/users').then((data) => setUsers(data.data));
  };

  const onClose = () => {
    setSearching(false);
    setSearchStr('');
  };

  const onClickUser = (user) => {
    setSearching(false);
    setSearchStr('');
    setOtherUser(user);
  };

  return (
    <>
      <InputBox placeholder="Search Users" onChange={(e) => setSearchStr(e.target.value)} onClick={() => onSearch()} value={searchStr} />
      {
        searching ? (
          <>
            <List>
              {
                users.map((user, i) => ((user.toLowerCase().indexOf(searchStr) > -1)
                  ? <SearchElement key={`${user}${i}`} onClick={() => onClickUser(user)}>{user}</SearchElement> : ''))
              }
            </List>
            <ActionButton type="submit" onClick={() => onClose()}>Close</ActionButton>
          </>
        ) : ''
      }
    </>
  );
};

export default Search;
