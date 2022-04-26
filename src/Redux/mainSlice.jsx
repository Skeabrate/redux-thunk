import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (obj, { dispatch, getState }) => {
    try {
      const { main } = getState(); // You can get every store
      console.log(main);

      const res = await axios.get(POST_URL);
      return [...res.data];
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchFakeApi = createAsyncThunk('posts/fetchFakeApi', (val) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const PASSWORD = 'password123';

      if (val === PASSWORD) {
        resolve([
          { id: 1, title: 'drugi post' },
          { id: 2, title: 'trzeci post' },
        ]);
      } else reject(new Error('wrong password'));
    }, 1000);
  });
});

export const mainSlice = createSlice({
  name: 'mainSlice',
  initialState: {
    posts: [],
    status: '',
    error: false,
  },
  reducers: {
    addPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    removePosts: (state, action) => {
      const posts = state.posts.filter((item) => item.id !== action.payload.id);

      return { ...state, posts };
    },
  },
  extraReducers: {
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.push(...action.payload);
    },
    [fetchFakeApi.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchFakeApi.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.posts.push(...action.payload);
    },
    [fetchFakeApi.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error;
    },
  },
  /* extraReducers(builder) {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.push(...action.payload);
    });
    builder
      .addCase(fetchFakeApi.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchFakeApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(...action.payload);
      })
      .addCase(fetchFakeApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }, */
});

export const { addPosts, removePosts } = mainSlice.actions;
export default mainSlice.reducer;
