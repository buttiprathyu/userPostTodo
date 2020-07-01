/* User  Reducer */
import {POSTS, POST_DELETED, POST_CREATED} from '../actions/types';

const INITIAL_STATE = {
  postsData: null,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS:
      return {
        ...state,
        postsData: action.payload,
      };

    case POST_CREATED: {
      return {
        ...state,
        postsData: state.postsData.concat(action.payload),
      };
    }

    case POST_DELETED: {
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.payload),
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
