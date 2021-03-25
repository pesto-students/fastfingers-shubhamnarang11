import React, { useEffect, useReducer, useState } from 'react';
import { getUserDetails } from '../../actions/Game.action';
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
  currentScore: 0,
  scores: [],
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

  useEffect(() => {
    getUserDetails(dispatch);
    inputRef.current.focus();
    // eslint-disable-next-line
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

  const stopGame = () => {
    submitScore(currentScore);
  };

  return (
    <div style={{ color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', marginTop: '20px', marginLeft: '20px' }}>
          <img
            src={Player}
            style={{ height: '30px', width: '30px', color: '#ff5155' }}
            alt=''
          ></img>
          <p
            style={{
              marginLeft: '15px',
              fontSize: '30px',
              lineHeight: '1.2',
              color: '#ff5155',
              marginTop: 0,
              marginBottom: '10px',
            }}
          >
            {userName.toUpperCase()}
          </p>
        </div>

        <p
          style={{
            fontSize: '30px',
            color: '#ff5155',
            marginBottom: '0',
            marginRight: '30px',
          }}
        >
          fast fingers
        </p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', marginLeft: '20px' }}>
          <img
            src={Gamepad}
            style={{ height: '30px', width: '30px', color: '#ff5155' }}
            alt=''
          ></img>
          <p
            style={{
              marginLeft: '15px',
              fontSize: '30px',
              lineHeight: '1.2',
              color: '#ff5155',
              marginTop: 0,
            }}
          >
            LEVEL : {difficultyLevel.toUpperCase()}
          </p>
        </div>
        <p
          style={{
            marginRight: '30px',
            fontSize: '30px',
            lineHeight: '1.2',
            color: '#ff5155',
            marginTop: '10px',
          }}
        >
          SCORE: {convertSecondsToTimerFormat(currentScore)}
        </p>
      </div>
      <div style={{ marginLeft: '12%' }}>
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
      <div>
        {currentWordAlphabets.map((alphabet, i) => (
          <p
            key={i}
            style={
              i < userInput.length
                ? isInputCorrect().includes(i)
                  ? {
                      display: 'inline',
                      color: '#445298',
                      fontSize: '60px',
                      fontWeight: '500',
                      textShadow: '0 0 16px rgba(0, 0, 0, 0.16)',
                    }
                  : {
                      display: 'inline',
                      color: '#54ba18',
                      fontSize: '60px',
                      fontWeight: '500',
                      textShadow: '0 0 16px rgba(0, 0, 0, 0.16)',
                    }
                : {
                    display: 'inline',
                    fontSize: '60px',
                    fontWeight: '500',
                    textShadow: '0 0 16px rgba(0, 0, 0, 0.16)',
                  }
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
        style={{
          padding: '20px 20px 20px 100px',
          opacity: '0.59',
          borderRadius: '15px',
          boxShadow: '0 3px 16px 0 rgba(0, 0, 0, 0.8)',
          fontSize: '26px',
          color: '#032228',
        }}
      ></input>
      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '50px',
          cursor: 'pointer',
        }}
        onClick={stopGame}
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
