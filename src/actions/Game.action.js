import { LoginService } from '../services/Login.service';

export const GAME_ACTIONS = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  GAME_ERROR: 'GAME_ERROR'
};

export default function getUserDetails(dispatch) {
  LoginService.getUserData()
    .then((userData) => {
      dispatch({type: GAME_ACTIONS.SET_USER_DETAILS, payload: userData})
    })
    .catch((err) => {
      dispatch({ type: GAME_ACTIONS.GAME_ERROR, payload: err });
    });
}
