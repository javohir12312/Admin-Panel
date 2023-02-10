import {LOGIN, LOGOUT} from 'shared/constants/ActionTypes';
const INIT_STATE = {
  isAuthenticated: false,
};

const Authentication = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default Authentication;
