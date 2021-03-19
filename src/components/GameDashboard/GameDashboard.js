import React, { useEffect, useReducer, useState } from 'react';
import getUserDetails from '../../actions/Game.action';
import gameReducer from '../../reducers/Game.reducer';
import {
  convertSecondsToTimerFormat,
  getNewWord,
} from '../../utils/commonFunctions';
import data from '../../data/dictionary.json';
import './GameDashboard.scss';
import { Timer } from '../';
import { DATA_STORE } from '../../utils/dataStore';
const initialState = {
  userName: '',
  difficultyLevel: '',
  currentScore: 0,
  scores: [],
};

export default function GameDashboard() {
  const [{ userName, difficultyLevel }, dispatch] = useReducer(
    gameReducer,
    initialState
  );
  const [currentScore, setCurrentScore] = useState(0);
  const [currentWordAlphabets, setCurrentWordAlphabets] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [difficultyFactor, setDifficultyFactor] = useState(1);
  const [isWordCompleted, setIsWordCompleted] = useState(false);

  useEffect(() => {
    getUserDetails(dispatch);
  }, []);

  const generateWord = () => {
    const newWord = getNewWord(data, usedWords, difficultyLevel);
    setCurrentWordAlphabets([...newWord]);
    setUsedWords([...usedWords, newWord]);
    setDifficultyFactor(
      DATA_STORE.DIFFICULTY_LEVEL_FACTOR_MAPPING[difficultyLevel] +
        usedWords.length * 0.01
    );
  };

  useEffect(() => {
    if (difficultyLevel) {
      const generateNewWord = () => {
        const newWord = getNewWord(data, usedWords, difficultyLevel);
        setCurrentWordAlphabets([...newWord]);
        setUsedWords([...usedWords, newWord]);
        setDifficultyFactor(
          DATA_STORE.DIFFICULTY_LEVEL_FACTOR_MAPPING[difficultyLevel] +
            usedWords.length * 0.01
        );
      };
      generateNewWord();
    }
  }, [difficultyLevel]);

  const isInputCorrect = () => {
    const wrongInputs = [];
    userInput.forEach((input, index) => {
      if (currentWordAlphabets[index] !== input) wrongInputs.push(index);
    });

    return wrongInputs;
  };

  const handleUserInput = ({ target: { value } = {} }) => {
    if (currentWordAlphabets.join('') === value.toLowerCase()) {
      setIsWordCompleted(true);
    } else {
      setUserInput([...value.toLowerCase()]);
    }
  };

  const stopGame = () => {};

  return (
    <div style={{ color: '#fff' }}>
      <div>
        <p style={{float: 'left'}}>{userName}</p>
        <p>fast fingers</p>
      </div>
      <div>
        <p>{difficultyLevel}</p>
        <p>SCORE: {convertSecondsToTimerFormat(currentScore)}</p>
      </div>
      <Timer
        word={currentWordAlphabets.join('')}
        difficultyFactor={difficultyFactor}
        stopGame={stopGame}
        isWordCompleted={isWordCompleted}
        updateScore={(score) => {
          setCurrentScore(currentScore + score);
          setIsWordCompleted(false);
          generateWord();
          setUserInput([]);
        }}
      ></Timer>
      <div>
        {currentWordAlphabets.map((alphabet, i) => (
          <p
            style={
              i < userInput.length
                ? isInputCorrect().includes(i)
                  ? { display: 'inline', color: '#445298' }
                  : { display: 'inline', color: '#54ba18' }
                : { display: 'inline' }
            }
          >
            {alphabet.toUpperCase()}
          </p>
        ))}
      </div>
      <input
        type='text'
        value={userInput.join('').toUpperCase()}
        onChange={handleUserInput}
      ></input>
    </div>
  );
}
