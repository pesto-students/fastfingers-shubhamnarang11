import React, { useEffect, useState } from 'react';
import { convertSecondsToTimerFormat } from '../../utils/commonFunctions';
import './Timer.scss';

export default class Timer extends React.Component {
  timerRef = null;
  intervalTimer = null;
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
    };

    this.timerRef = React.createRef();
  }
  componentDidMount() {
    this.timerRef.current.style.animation = `countdown ${this.props.time}s linear forwards`;

    this.intervalTimer = setInterval(() => {
      if (this.state.currentTime === 0) {
        clearInterval(this.intervalTimer);
        this.props.stopGame();
      } else {
        this.setState({
          currentTime: this.state.currentTime - 1,
        });
      }
    }, 1000);

    this.setState({ currentTime: this.getTimerValue() });
  }
  componentDidUpdate(prevProps) {
    let { currentTime } = this.state;
    if (this.props.isWordCompleted) {
      this.props.updateScore(this.state.currentTime);
    }

    if (prevProps.word !== this.props.word) {
      currentTime = this.getTimerValue();
      this.timerRef.current.style.animation = `countdown ${this.getTimerValue()}s linear forwards`;
      this.setState({ currentTime: this.getTimerValue() });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalTimer);
  }

  getTimerValue = () => {
    return Math.round(this.props.word.length / this.props.difficultyFactor);
  };

  render() {
    const { currentTime } = this.state;
    return (
      <svg height='350' width='350'>
        <circle
          cx='110'
          cy='110'
          r='100'
          stroke='white'
          strokeWidth='10'
          fill='none'
        />
        <circle
          ref={this.timerRef}
          id='timer'
          cx='110'
          cy='110'
          r='100'
          // stroke='red'
          strokeWidth='10'
          fill='none'
        />
        <text x='110' y='110' textAnchor='middle' stroke='red'>
          {convertSecondsToTimerFormat(currentTime)}
        </text>
      </svg>
    );
  }
}
