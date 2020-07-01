/* User  Reducer */
import {USERS} from '../actions/types';

const INITIAL_STATE = {
  userData: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERS:
      return {
        ...state,
        userData: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
