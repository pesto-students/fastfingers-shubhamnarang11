import { GAME_ACTIONS } from '../actions/Game.action';

export default function gameReducer(state, action) {
  switch (action.type) {
    case GAME_ACTIONS.SET_USER_DETAILS:
      return {
        ...state,
        userName: action.payload.userName,
        difficultyLevel: action.payload.difficultyLevel,
      };

    default:
      return state;
  }
}
