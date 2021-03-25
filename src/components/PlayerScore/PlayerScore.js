import React, { useReducer, useEffect, useState } from 'react';
import { getUserDetails, getGameScores } from '../../actions/Game.action';
import gameReducer from '../../reducers/Game.reducer';
import { convertSecondsToTimerFormat } from '../../utils/commonFunctions';
import PlayAgain from '../../assets/PlayAgain.svg';
import Player from '../../assets/Player.svg';
import Gamepad from '../../assets/Gamepad.svg';
import { DATA_STORE } from '../../utils/dataStore';

const initialState = {
  userName: '',
  difficultyLevel: '',
};

export default function PlayerScore({ restartGame }) {
  const [{ userName, difficultyLevel }, dispatch] = useReducer(
    gameReducer,
    initialState
  );
  const [allScores, setAllScores] = useState([]);
  
  useEffect(() => {
    getUserDetails(dispatch);
    getGameScores().then((scores) => {
      setAllScores(scores);
    });
  }, []);

  const isScoreHighest = () => {
    return Math.max(...allScores) === allScores[allScores.length - 1];
  };

  const quitGame = () => {
    window.location.href = DATA_STORE.APP_NAVIGATION_ROUTES.LOGIN;
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
          fontSize: '50px',
          lineHeight: '1.2',
          color: '#ffffff',
          marginTop: '22px',
          marginBottom: 0,
        }}
      >
        SCORE : GAME {allScores.length}
      </p>
      <p
        style={{
          fontSize: '70px',
          lineHeight: '1.2',
          color: '#ffffff',
          marginTop: '20px',
          marginBottom: 0,
        }}
      >
        {convertSecondsToTimerFormat(allScores[allScores.length - 1])}
      </p>
      {isScoreHighest ? (
        <p
          style={{
            fontSize: '30px',
            lineHeight: '1.2',
            color: '#ffffff',
            marginTop: '30px',
          }}
        >
          New High Score
        </p>
      ) : null}
      <div
        onClick={restartGame}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '60px',
          cursor: 'pointer',
        }}
      >
        <img
          src={PlayAgain}
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
          PLAY AGAIN
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          marginLeft: '20px',
          marginTop: '50px',
          cursor: 'pointer',
        }}
        onClick={quitGame}
      >
        <p
          style={{
            fontSize: '30px',
            lineHeight: '1.2',
            color: '#ff5155',
            marginTop: 0,
          }}
        >
          QUIT
        </p>
      </div>
    </div>
  );
}
