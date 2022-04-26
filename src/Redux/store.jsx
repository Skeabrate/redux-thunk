import { configureStore } from '@reduxjs/toolkit';
import mainSlice, { fetchPosts } from './mainSlice';

export const middlewareFunc = (store) => (next) => (action) => {
  console.log('first middleware ran');
  /* store.dispatch(action); */
  return next(action);
};

export const secondMiddlewareFunc = (store) => (next) => (action) => {
  if (store.getState().main.posts.length === 2) {
    setTimeout(() => {
      return next({
        type: 'mainSlice/addPosts',
        payload: { ...action.payload, title: 'trzeci post' },
      });
    }, 1000);
  } else {
    return next(action);
  }
};

const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(middlewareFunc, secondMiddlewareFunc);
  },
});

export default store;
