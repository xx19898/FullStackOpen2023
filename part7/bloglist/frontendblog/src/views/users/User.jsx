/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom';
import { AppContext } from '../../App';
import { getUserDetailedInfo } from '../../apiCalls';
import { useQuery } from 'react-query';
import { useContext } from 'react';

const User = () => {
  const { userId } = useParams();
  const { state } = useContext(AppContext);
  const token = state.userInfo.token;
  const { data } = useQuery('userDetailed', () =>
    getUserDetailedInfo({ token: token, userId: userId }),
  );

  if (data === undefined) return <p>Loading user data...</p>;

  return(
    <div>
        <p><strong>{data.username}</strong></p>
        <ul>
        {
            data.blogs.map((blog) => <li key={blog._id}><p>{blog.title}</p></li>)
        }
        </ul>
    </div>
  )
};


export default User