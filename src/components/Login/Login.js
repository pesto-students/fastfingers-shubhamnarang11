import React, { useState, useReducer } from 'react';
import './Login.scss';
import { DATA_STORE } from '../../utils/dataStore';
import initGame from '../../actions/Login.action';
import loginReducer from '../../reducers/Login.reducer';
import Keyboard from '../../assets/Keyboard.png';
import PlayIcon from '../../assets/StartGame.svg';

export default function LoginComponent() {
  const {
    LOGIN_SCREEN: {
      APP_HEADER,
      APP_SUBHEADER,
      NAME_INPUT_PLACEHOLDER,
      DIFICULTY_LEVEL_INPUT: { SELECT_PLACEHOLDER, LEVELS },
    },
  } = DATA_STORE;

  const [, dispatch] = useReducer(loginReducer, {});

  const [userName, setUserName] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');

  const handleInputChange = (value, callEvent) => {
    callEvent(value);
  };

  const startGame = () => {
    initGame(dispatch, {
      userName,
      difficultyLevel: difficultyLevel || 'easy',
    });
  };

  return (
    <div className='login-container'>
      <img src={Keyboard} alt='' className='keyboard-image' />
      <p className='app-header'>{APP_HEADER}</p>
      <p className='app-subheader'>{APP_SUBHEADER}</p>
      <input
        type='text'
        placeholder={NAME_INPUT_PLACEHOLDER}
        value={userName}
        onChange={(event) => handleInputChange(event.target.value, setUserName)}
      />
      <div className='select'>
        <select
          id='standard-select'
          value={difficultyLevel}
          onChange={(event) =>
            handleInputChange(event.target.value, setDifficultyLevel)
          }
        >
          <option default style={{ display: 'none' }}>
            {SELECT_PLACEHOLDER}
          </option>
          {LEVELS.map((level, i) => (
            <option key={i} value={level.toLowerCase()}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div onClick={startGame} className="start-game-div">
        <img src={PlayIcon} alt=''></img>
        <p>START GAME</p>
      </div>
    </div>
  );
}
