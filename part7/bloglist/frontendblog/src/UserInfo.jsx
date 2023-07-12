import { useContext, useMemo } from 'react';
import './App.css';
import Blog from './views/blogs/Blog';
import { AppContext } from './App';
import { useQuery, useMutation } from 'react-query';
import { queryClient } from './main';
import { deleteBlog, getBlogs, like } from './apiCalls';

const UserInfo = () => {
  const { dispatch, state } = useContext(AppContext);
  const { username, token } = state.userInfo;

  const { data: blogs, isFetched } = useQuery(['blogs'], () => getBlogs({ token }));

  const likeMutation = useMutation(like, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('blogs');
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Liked ${variables.blog}`, type: 'SUCCESS' },
      });
    },
    onError: (err) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { text: `${err}` } });
    },
  });

  const deleteMutation = useMutation(deleteBlog, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('blogs');
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Deleted blog with id ${variables}`, type: 'SUCCESS' },
      });
    },
  });

  const sortedBlogs = useMemo(() => {
    if (isFetched) {
      return blogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
    } else {
      return blogs;
    }
  }, [blogs]);

  if (sortedBlogs === undefined) return <p>Loading blogs...</p>;

  return (
    <div>
      <p>
        Logged in user: <strong> {username} </strong>
      </p>
      {sortedBlogs.length === 0 ? (
        <p>You do not have any blogs stored yet ;(</p>
      ) : (
        <ul className='blog-list'>
          {sortedBlogs.map((blog) => {
            return (
              <Blog
                blog={blog}
                addedBy={username}
                like={likeMutation.mutate}
                deleteBlog={deleteMutation.mutate}
                key={blog._id}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UserInfo;
