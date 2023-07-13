import { useContext } from 'react';
import { AppContext } from '../App';
import '../App.css';

export const LoggedUserSection = () => {
  const { state, dispatch } = useContext(AppContext);
  const loggedInUser = state.userInfo.username;

  return (
    <>
      <p className='logged-user-label'>
        <strong>{loggedInUser}</strong> logged in
      </p>
      <button
        className='logout-button'
        onClick={() => dispatch({ type: 'SET_USERINFO', payload: { username: null, token: null } })}
      >
        Logout
      </button>
    </>
  );
};
