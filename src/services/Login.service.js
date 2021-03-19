function saveUserDataAndStartGame({ userName, difficultyLevel }) {
  sessionStorage.setItem('loggedInUser', userName);
  sessionStorage.setItem('selectedDifficultyLevel', difficultyLevel);

  return Promise.resolve();
}

function getUserData() {
  const userName = sessionStorage.getItem('loggedInUser');
  const difficultyLevel = sessionStorage.getItem('selectedDifficultyLevel');

  return Promise.resolve({ userName, difficultyLevel });
}

export const LoginService = { saveUserDataAndStartGame, getUserData };
