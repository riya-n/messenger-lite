import s from 'styled-components';

export const AccountPage = s.div`
  margin: 1rem 2rem;
  font-family: ui-monospace;
`;

export const InputBox = s.input`
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  color: #283033;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  margin-bottom: 1rem;
`;

export const ActionButton = s.button`
  cursor: pointer;
  width: 100%;
  background-color: rgb(64,224,208);
  color: white;
  font-weight: 500;
  border: 1px solid transparent;
  padding: .5rem .75rem;
  border-radius: .25rem;
  margin-bottom: 0.5rem;
`;
