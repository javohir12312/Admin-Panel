import {LOGIN, LOGOUT} from '../../shared/constants/ActionTypes';

export const login = (message) => {
  return (dispatch) => dispatch({type: LOGIN, payload: message});
};

export const logout = (message) => {
  return (dispatch) => dispatch({type: LOGOUT, payload: message});
};
