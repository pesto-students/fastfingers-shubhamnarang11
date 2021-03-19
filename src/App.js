import React from 'react';
import './App.css';
import { GameDashboard, LoginComponent } from './components';

const APP_ROUTES = {
  '/': <LoginComponent></LoginComponent>,
  '/game':<GameDashboard></GameDashboard>
}
function App() {
  return (
    <div className='App'>
      {APP_ROUTES[window.location.pathname]}
    </div>
  );
}

export default App;
