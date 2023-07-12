import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AppContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewComment, deleteBlog, getBlogDetailed, like } from '../../apiCalls';
import { useContext, useState } from 'react';

const SingleBlogPage = () => {
  const [comment, setComment] = useState('');
  const { state, dispatch } = useContext(AppContext);
  const { blogId } = useParams();
  const { token, username } = state.userInfo;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data } = useQuery('blogDetailed', () =>
    getBlogDetailed({ token: state.userInfo.token, blogId: blogId }),
  );

  const likeMutation = useMutation(like, {
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries(['blogDetailed']);
      queryClient.invalidateQueries(['blogs']);
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
      queryClient.invalidateQueries(['blogDetailed']);
      queryClient.invalidateQueries(['blogs']);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Deleted blog with id ${variables}`, type: 'SUCCESS' },
      });
      navigate('/');
    },
  });

  const addCommentMutation = useMutation(addNewComment, {
    onSucces: (data, variables) => {
      queryClient.invalidateQueries(['blogDetailed']);
      queryClient.invalidateQueries(['blogs']);
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { text: `Deleted blog with id ${variables}`, type: 'SUCCESS' },
      });
    },
  });

  console.log({ data });

  if (data === undefined || data === null) return <p>Blog data loading...</p>;

  return (
    <div>
      <p>
        <strong>{data.title}</strong>
      </p>
      <p>Likes: {data.likes}</p>
      <button onClick={() => likeMutation.mutate({ token: token, blog: data })}>Like</button>
      <p>: {data.likes}</p>
      <p>Author : {data.author}</p>
      <p>
        Added by <strong>{data.user.username}</strong>
      </p>
      {data.user.username === username ? (
        <button onClick={() => deleteMutation.mutate({ token: token, blogId: data._id })}>
          Delete
        </button>
      ) : null}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCommentMutation.mutate({ token: token, comment: comment, blogId: data._id });
        }}
      >
        <label>Comment field</label>
        <input onChange={(e) => setComment(e.target.value)}></input>
        <button>Post comment</button>
      </form>
    </div>
  );
};

export default SingleBlogPage;
