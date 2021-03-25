import React from 'react';
import './App.css';
import { GameDashboard, GameScore, LoginComponent } from './components';
import { DATA_STORE } from './utils/dataStore';
import { saveGameScores } from './actions/Game.action';

class App extends React.Component {
  submitScore = (score) => {
    saveGameScores(score);
    window.location.pathname = DATA_STORE.APP_NAVIGATION_ROUTES.GAME_SCORE;
  };

  restartGame = () => {
    window.location.pathname = DATA_STORE.APP_NAVIGATION_ROUTES.GAME;
  };

  renderRoute = () => {
    const APP_ROUTES = {
      '/': <LoginComponent></LoginComponent>,
      '/game': (
        <GameDashboard
          submitScore={this.submitScore}
        ></GameDashboard>
      ),
      '/game-score': (
        <GameScore
          restartGame={this.restartGame}
        ></GameScore>
      ),
    };
    return APP_ROUTES[window.location.pathname];
  };
  render() {
    return <div className='App'>{this.renderRoute()}</div>;
  }
}

export default App;
