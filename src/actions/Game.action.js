import { GameService } from '../services/Game.service';
import { LoginService } from '../services/Login.service';

export const GAME_ACTIONS = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  GAME_ERROR: 'GAME_ERROR',
  UPDATE_DIFFICULTY_LEVEL: 'UPDATE_DIFFICULTY_LEVEL',
};

function getUserDetails(dispatch) {
  LoginService.getUserData()
    .then((userData) => {
      dispatch({ type: GAME_ACTIONS.SET_USER_DETAILS, payload: userData });
    })
    .catch((err) => {
      dispatch({ type: GAME_ACTIONS.GAME_ERROR, payload: err });
    });
}

function saveGameScores(score) {
  GameService.saveGameScores(score)
    .then((score) => {
      return score;
    })
    .catch((err) => {
      console.log(err);
    });
}

function getGameScores() {
  return GameService.getGameScores();
}

function updateDifficultyLevel(dispatch, difficultyLevel) {
  LoginService.updateDifficultyLevel(difficultyLevel)
    .then(() => {
      dispatch({
        type: GAME_ACTIONS.UPDATE_DIFFICULTY_LEVEL,
        payload: { difficultyLevel },
      });
    })
    .catch((err) => {
      dispatch({ type: GAME_ACTIONS.GAME_ERROR, payload: err });
    });
}
export { getUserDetails, saveGameScores, getGameScores, updateDifficultyLevel };
