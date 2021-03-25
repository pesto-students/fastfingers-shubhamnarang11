function saveGameScores(score) {
  const scores = JSON.parse(sessionStorage.getItem('scores') || '[]');

  if(scores) {
    scores.push(score);
    sessionStorage.setItem('scores', JSON.stringify(scores));
  }
  return Promise.resolve();
}

function getGameScores() {
  const scores = JSON.parse(sessionStorage.getItem('scores') || '[]');
  return Promise.resolve(scores);
}

export const GameService = { saveGameScores, getGameScores };
