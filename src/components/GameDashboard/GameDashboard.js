import React, { useEffect, useReducer, useState } from 'react';
import {
  getUserDetails,
  updateDifficultyLevel,
  getGameScores,
} from '../../actions/Game.action';
import gameReducer from '../../reducers/Game.reducer';
import {
  convertSecondsToTimerFormat,
  getNewWord,
} from '../../utils/commonFunctions';
import data from '../../data/dictionary.json';
import './GameDashboard.scss';
import { Timer } from '../';
import { DATA_STORE } from '../../utils/dataStore';
import Player from '../../assets/Player.svg';
import Gamepad from '../../assets/Gamepad.svg';
import Close from '../../assets/Close.svg';

const initialState = {
  userName: '',
  difficultyLevel: '',
};

export default function GameDashboard({ submitScore }) {
  const inputRef = React.createRef();
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
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getUserDetails(dispatch);
    getGameScores().then((scores) => {
      setScores(scores);
    });
    inputRef.current.focus();
    // eslint-disable-next-line
  }, []);

  const generateWord = () => {
    const newWord = getNewWord(data, usedWords, difficultyLevel);
    setCurrentWordAlphabets([...newWord]);
    setUsedWords([...usedWords, newWord]);
    if (
      difficultyFactor >
        DATA_STORE.DIFFICULTY_LEVEL_FACTOR_MAPPING[difficultyLevel] + 0.5 &&
      difficultyLevel !== 'hard'
    ) {
      setUsedWords([]);
      updateDifficultyLevel(
        dispatch,
        difficultyLevel === 'easy' ? 'medium' : 'hard'
      );
    }
    setDifficultyFactor(
      DATA_STORE.DIFFICULTY_LEVEL_FACTOR_MAPPING[difficultyLevel] +
        usedWords.length * 0.1
    );
  };

  useEffect(() => {
    if (difficultyLevel) {
      generateWord();
    }
    // eslint-disable-next-line
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

  const stopGame = (score) => {
    submitScore(currentScore + score);
  };

  const getMaxScore = () => {
    return Math.max(...scores);
  };
  return (
    <div className='game-dashboard-container'>
      <div className='headers'>
        <div>
          <img src={Player} alt=''></img>
          <p>{userName.toUpperCase()}</p>
        </div>

        <p id='app-header'>fast fingers</p>
      </div>
      <div className='headers'>
        <div style={{ marginTop: '0' }}>
          <img src={Gamepad} alt=''></img>
          <p>LEVEL : {difficultyLevel.toUpperCase()}</p>
        </div>
        <p id='app-score'>SCORE: {convertSecondsToTimerFormat(currentScore)}</p>
      </div>
      <div className='main'>
        <div className='score-list'>
          <p className='header'>SCORE BOARD</p>
          <ul>
            {scores.map((score, i) => (
              <li>
                {score === getMaxScore()
                  ? null
                  : `Game ${i + 1} : ${convertSecondsToTimerFormat(score)}`}
              </li>
            ))}
          </ul>
          <p className='personal-best'>PERSONAL BEST</p>
          <ul>
            {scores.map((score, i) => (
              <li>
                {score !== getMaxScore()
                  ? null
                  : `Game ${i + 1} : ${convertSecondsToTimerFormat(score)}`}
              </li>
            ))}
          </ul>
        </div>
        <div className='timer-div'>
          <div>
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
          </div>
          <div sclassName='word-div'>
            {currentWordAlphabets.map((alphabet, i) => (
              <p
                key={i}
                className={
                  i < userInput.length
                    ? isInputCorrect().includes(i)
                      ? 'incorrect-alphabet word'
                      : 'correct-alphabet word'
                    : 'word'
                }
              >
                {alphabet.toUpperCase()}
              </p>
            ))}
          </div>
          <input
            ref={inputRef}
            type='text'
            value={userInput.join('').toUpperCase()}
            onChange={handleUserInput}
          ></input>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '50px',
          cursor: 'pointer',
        }}
        onClick={() => stopGame(0)}
      >
        <img
          src={Close}
          style={{ height: '40px', width: '40px', color: '#ff5155' }}
          alt=''
        ></img>
        <p
          style={{
            fontSize: '30px',
            lineHeight: '1.2',
            color: '#ff5155',
            marginTop: 0,
          }}
        >
          STOP GAME
        </p>
      </div>
    </div>
  );
}
