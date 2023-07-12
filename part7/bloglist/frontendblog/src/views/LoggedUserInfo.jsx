import { useContext } from 'react';
import { AppContext } from '../App';

export const LoggedUserSection = () => {
  const { state, dispatch } = useContext(AppContext);
  const loggedInUser = state.userInfo.username;

  return (
    <>
      <p>{loggedInUser} logged in</p>
      <button
        onClick={() => dispatch({ type: 'SET_USERINFO', payload: { username: null, token: null } })}
      >
        Logout
      </button>
    </>
  );
};
