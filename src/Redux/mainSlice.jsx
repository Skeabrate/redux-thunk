import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const res = await axios.get(POST_URL);
    return [...res.data];
  } catch (err) {
    console.log(err);
  }
});

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
      console.log(state);
      state.posts.push({ id: 0, title: action.payload.title });
    },
  },
  extraReducers(builder) {
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
  },
});

export const { addPosts } = mainSlice.actions;
export default mainSlice.reducer;
