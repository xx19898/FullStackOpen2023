import { useContext } from 'react';
import { AppContext } from '../../App';
import Blog from './Blog';
import { queryClient } from '../../main';
import { useMutation } from 'react-query';
import { deleteBlog, like } from '../../apiCalls';
import { useMemo } from 'react';
import BlogCreationForm from './BlogCreationForm';

export const BlogSection = () => {
  const { state, dispatch } = useContext(AppContext);

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

  const blogs = useMemo(() => {
    if (state.blogs === undefined || state.blogs.length === 0) return [];
    else {
      return state.blogs.sort(function (a, b) {
        return a.likes - b.likes;
      });
    }
  }, [state.blogs]);

  return (
    <>
      {blogs.length === 0 ? (
        <p>No blogs here yet :/</p>
      ) : (
        <ul>
          {blogs.map((blog) => {
            <Blog
              blog={blog}
              addedBy={''}
              like={likeMutation.mutate}
              deleteBlog={deleteMutation.mutate}
              key={blog._id}
            />;
          })}
        </ul>
      )}
      <BlogCreationForm />
    </>
  );
};
