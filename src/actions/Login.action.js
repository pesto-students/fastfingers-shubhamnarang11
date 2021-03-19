import { LoginService } from '../services/Login.service';
import { DATA_STORE } from '../utils/dataStore';

export const LOGIN_ACTIONS = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  LOGIN_ERROR: 'LOGIN_ERROR',
};

export default function initGame(dispatch, userPayload) {
  LoginService.saveUserDataAndStartGame(userPayload)
    .then(() => {
      window.location.href = DATA_STORE.APP_NAVIGATION_ROUTES.GAME;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_ACTIONS.LOGIN_ERROR, payload: err });
    });
}
