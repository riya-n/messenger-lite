/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  InputBox, List, SearchElement, ActionButton,
} from '../styles';

const Search = (props) => {
  const { setSearching, searching } = props;
  const [searchStr, setSearchStr] = useState('');
  const [users, setUsers] = useState([]);
  const [curr, setCurr] = useState('');
  const history = useHistory();

  const onSearch = async () => {
    setSearching(true);
    await axios.get('/account/').then((data) => setCurr(data.data));
    await axios.get('/api/users').then((data) => setUsers(data.data));
  };

  const onClose = () => {
    setSearching(false);
    setSearchStr('');
  };

  const onClickUser = async (user) => {
    setSearching(false);
    setSearchStr('');
    await axios.post('/api/user2', { id: user });
    history.push(`/c/${user}`);
  };

  return (
    <>
      <InputBox
        placeholder="Search Users"
        onChange={(e) => setSearchStr(e.target.value)}
        onClick={() => onSearch()}
        value={searchStr}
      />
      {
        searching ? (
          <>
            <List>
              {
                users.map(({ username }, i) => ((username.toLowerCase().indexOf(searchStr) > -1
                  && username !== curr)
                  ? (
                    <SearchElement
                      key={`${username}${i}`}
                      onClick={() => onClickUser(username)}
                    >
                      {username}
                    </SearchElement>
                  ) : ''))
              }
              <ActionButton type="submit" onClick={() => onClose()}>Close</ActionButton>
            </List>
          </>
        ) : ''
      }
    </>
  );
};

export default Search;
