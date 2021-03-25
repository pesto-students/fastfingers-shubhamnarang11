function convertSecondsToTimerFormat(time) {
  return [time / 6000, time / 100, time % 100]
    .map((val) => `0${Math.floor(val)}`.slice(-2))
    .filter((val, i) => {
      if (i === 0 && val === '00') {
        return false;
      }
      return true;
    })
    .join(':');
}

function isWordLengthSatisfiesGivenDifficultyLevel(word, difficultyLevel) {
  const DIFFICULTY_LEVEL_LENGTH_COMPARISON = {
    easy: word.length <= 4,
    medium: word.length > 4 && word.length <= 8,
    hard: word.length > 8,
  };

  return DIFFICULTY_LEVEL_LENGTH_COMPARISON[difficultyLevel];
}

function getNewWord(wordsList, usedWords, difficultyLevel) {
  let newWord = '';
  while (!newWord) {
    newWord = wordsList[Math.floor(Math.random() * wordsList.length)];

    if (
      (usedWords && usedWords.includes(newWord)) ||
      !isWordLengthSatisfiesGivenDifficultyLevel(newWord, difficultyLevel)
    ) {
      newWord = '';
    }
  }

  return newWord;
}

export { convertSecondsToTimerFormat, getNewWord };
