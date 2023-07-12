import { useContext } from 'react';
import { AppContext } from '../../App';
import Blog from './Blog';
import { queryClient } from '../../main';
import { useMutation, useQuery } from 'react-query';
import { deleteBlog, getBlogs, like } from '../../apiCalls';
import { useMemo } from 'react';
import BlogCreationForm from './BlogCreationForm';

export const BlogSection = () => {
  const { state, dispatch } = useContext(AppContext);
  const token = state.userInfo.token;
  const { data } = useQuery('blogs', () => getBlogs({ token: token }));

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

  console.log({ data });

  const blogs = useMemo(() => {
    if (data === undefined || data.length === 0) return [];
    else {
      return data.sort(function (a, b) {
        return a.likes - b.likes;
      });
    }
  }, [data]);

  console.log({ blogs });

  return (
    <>
      {blogs.length === 0 ? (
        <p>No blogs here yet :/</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <Blog
              blog={blog}
              addedBy={''}
              like={likeMutation.mutate}
              deleteBlog={deleteMutation.mutate}
              key={blog._id}
            />
          ))}
        </ul>
      )}
      <BlogCreationForm />
    </>
  );
};
