import {USERS, POSTS, POST_DELETED, POST_CREATED} from '../actions/types';

/* Action Creator */

export const setUsersList = user => ({
  type: USERS,
  payload: user,
});

export const setPostsList = post => ({
  type: POSTS,
  payload: post,
});

export const deletePostsList = post => ({
  type: POST_DELETED,
  payload: post,
});

export const createPostsList = post => ({
  type: POST_CREATED,
  payload: post,
});
