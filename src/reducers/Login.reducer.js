import { LOGIN_ACTIONS } from '../actions/Login.action';

const initialState = {
  userName: '',
  difficultyLevel: '',
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.LOGIN_USER:
      return {
        ...state,
        userName: action.payload.userName,
        difficultyLevel: action.payload.difficultyLevel,
      };

    default:
      return state;
  }
}
