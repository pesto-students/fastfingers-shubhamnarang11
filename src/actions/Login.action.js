import { LoginService } from '../services/Login.service';
import { DATA_STORE } from '../utils/dataStore';

export default function initGame(userPayload) {
  LoginService.saveUserDataAndStartGame(userPayload)
    .then(() => {
      window.location.href = DATA_STORE.APP_NAVIGATION_ROUTES.GAME;
    })
    .catch((err) => {
      console.log(err);
    });
}
