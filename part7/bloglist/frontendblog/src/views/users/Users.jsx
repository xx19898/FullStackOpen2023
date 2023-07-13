import { useContext } from 'react';
import { AppContext } from '../../App';
import { useQuery } from 'react-query';
import { getUsersInfo } from '../../apiCalls';
import { Link } from 'react-router-dom';
import './Users.css';

export const Users = () => {
  const { state } = useContext(AppContext);
  const token = state.userInfo.token;
  const { data, isLoading } = useQuery(
    ['users', { token: token }],
    () => getUsersInfo({ token: token }),
    {
      retry: false,
    },
  );

  if (data === undefined) return <p>Users data is loading...</p>;

  return (
    <table className='users-table-main'>
      <thead>
        <tr>
          <th>User</th>
          <th>Number of blogs</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          return (
            <tr key={user._id}>
              <th>
                <Link to={`/users/${user._id}`}>{user.username}</Link>
              </th>
              <th>{user.blogCount}</th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
