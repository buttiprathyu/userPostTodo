import {combineReducers} from 'redux';
import userReducer from './usersReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  userReducer,
  postsReducer,
});
