import { Provider } from 'react-redux';
import store from './Redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addPosts, fetchPosts, fetchFakeApi } from './Redux/mainSlice';
import { useEffect } from 'react';

const Child = () => {
  const state = useSelector((state) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div>
      <button onClick={() => dispatch(addPosts({ title: 'pierwszy post' }))}>
        Increment
      </button>
      <button onClick={() => dispatch(fetchFakeApi('password123'))}>
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
        {state.map(({ id, title }) => (
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
    </div>
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
