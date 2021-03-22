import React from 'react';
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

  componentDidUpdate(prevProps) {
    if (this.props.isWordCompleted) {
      this.props.updateScore(this.state.currentTime);
      clearInterval(this.intervalTimer);
    }

    if (prevProps.word !== this.props.word) {
      const timerValue = this.getTimerValue();
      var keyFrames = `
      @keyframes ${this.props.word} {\
        from {\
          stroke-dashoffset: 375px;\
        }\
        to {\
          stroke-dashoffset: 1000px;\
        }\
      }\
      `;

      this.timerRef.current.style.animation = `${this.props.word} ${timerValue}s linear forwards`;
      document.styleSheets[0].insertRule(keyFrames);
      this.setState({ currentTime: timerValue }, () => {
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
      });
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
      <svg height='250' width='350'>
        <circle
          cx='110'
          cy='110'
          r='100'
          stroke='#00435d'
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
        <text x='110' y='110' textAnchor='middle' stroke='#ffffff' style={{fontSize: '30px'}} fill="#ffffff">
          {convertSecondsToTimerFormat(currentTime)}
        </text>
      </svg>
    );
  }
}
