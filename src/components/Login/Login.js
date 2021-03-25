import React, { useState } from 'react';
import './Login.scss';
import { DATA_STORE } from '../../utils/dataStore';
import initGame from '../../actions/Login.action';
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

  const [userName, setUserName] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [isUserName, setIsUserName] = useState(true);

  const handleInputChange = (value, callEvent) => {
    callEvent(value);
  };

  const startGame = () => {
    if (userName) {
      initGame({
        userName,
        difficultyLevel: difficultyLevel || 'easy',
      });
    } else {
      setIsUserName(false);
    }
  };

  return (
    <div className='login-container'>
      <img src={Keyboard} alt='' className='keyboard-image' />
      <p className='app-header'>{APP_HEADER}</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div class='line'></div>
        <p className='app-subheader'>{APP_SUBHEADER}</p>
        <div class='line'></div>
      </div>
      <input
        type='text'
        placeholder={NAME_INPUT_PLACEHOLDER}
        value={userName.toUpperCase()}
        onChange={(event) =>
          handleInputChange(event.target.value.toLowerCase(), setUserName)
        }
      />
      {!isUserName ? (
        <p
          style={{
            color: 'red',
            textAlign: 'left',
            margin: 0,
            marginLeft: '35%',
          }}
        >
          *Please enter your name!
        </p>
      ) : null}
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
            <option
              key={i}
              value={level.toLowerCase()}
              style={{
                backgroundColor: '#ffffff',
                opacity: '0.59',
                color: '#032228',
              }}
            >
              {level}
            </option>
          ))}
        </select>
      </div>
      <div onClick={startGame} className='start-game-div'>
        <img src={PlayIcon} alt=''></img>
        <p>START GAME</p>
      </div>
    </div>
  );
}
