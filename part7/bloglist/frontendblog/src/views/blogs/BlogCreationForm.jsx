import { useContext, useState } from 'react';
import '../../App.css';
import { useMutation } from 'react-query';
import { queryClient } from '../../main';
import { AppContext } from '../../App';
import { createBlog } from '../../apiCalls';

const BlogCreationForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const { dispatch, state } = useContext(AppContext);

  const token = state.userInfo.token;

  function reset() {
    setTitle('');
    setAuthor('');
    setUrl('');
  }

  const createNewBlog = useMutation(createBlog, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries('blogs');
      reset();
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'SUCCESS', text: `Added ${variables.title}` },
      });
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', payload: { type: 'ERROR', text: `${error}` } });
    },
  });

  const [formVisible, setFormVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Hide blog creation form' : 'Create new blog entry'}
      </button>
      {formVisible ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createNewBlog.mutate({
              blog: { title: title, url: url, author: author, likes: 0 },
              token: token,
            });
          }}
          className='blog-creation-form'
        >
          <label htmlFor='title' className='label'>
            Title
          </label>
          <input
            id='titleInput'
            onChange={(e) => setTitle(e.target.value)}
            className='input'
          ></input>
          <label htmlFor='author' className='label'>
            Author
          </label>
          <input
            id='authorInput'
            onChange={(e) => setAuthor(e.target.value)}
            className='input'
          ></input>
          <label htmlFor='url' className='label'>
            Url
          </label>
          <input id='urlInput' onChange={(e) => setUrl(e.target.value)} className='input'></input>
          <button>Create Blog</button>
        </form>
      ) : null}
    </div>
  );
};

export default BlogCreationForm;
