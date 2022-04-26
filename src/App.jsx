import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPosts,
  removePosts,
  fetchPosts,
  fetchFakeApi,
} from './Redux/mainSlice';

const Child = () => {
  const { posts, status, error } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const postId = useRef(0);

  /* useEffect(() => {
    console.log({ posts, status, error: error.message })
     console.log(posts);
  }, [posts, error, status]); */

  return (
    <main>
      <button
        onClick={() => {
          dispatch(addPosts({ id: postId.current, title: 'przykladowy post' }));
          postId.current++;
        }}
      >
        Add post
      </button>
      <button onClick={() => dispatch(removePosts({ id: 0 }))}>
        Remove post
      </button>
      <button onClick={() => dispatch(fetchFakeApi('password1223'))}>
        Fetch fake posts
      </button>
      <button onClick={() => dispatch(fetchPosts())}>Fetch ALL posts</button>

      <h2>Posts:</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gridGap: '30px',
        }}
      >
        {posts?.map(({ id, title }) => (
          <div
            key={id}
            style={{
              border: '1px solid grey',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <h3>{id}.</h3>
            <p style={{ margin: '10px' }}>{title}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

function App() {
  return (
    <Provider store={store}>
      <div style={{ margin: '20px' }}>
        <h1>Redux Thunk</h1>

        <Child />
      </div>
    </Provider>
  );
}

export default App;
