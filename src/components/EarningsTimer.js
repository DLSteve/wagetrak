import React, {useState, useEffect} from 'react';
import useSecondTimer from "../hooks/useSecondTimer";
import useTimerOptions from '../hooks/useTimerOptions'

import CurrentAmountCounter from './CurrentAmountCounter';
import TimerOptions from './TimerOptions'


export default function EarningsTimer() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const options = useTimerOptions({});
  const {
    running,
    seconds,
    startTimer,
    stopTimer,
    resetTimer
  } = useSecondTimer();

  useEffect(() => {
    const adjustedRate = options.rate * options.exchangeRate;
    const ratePerSecond = adjustedRate / 3600;
    setCurrentAmount(ratePerSecond * Math.floor(seconds))
  }, [options.exchangeRate, options.rate, seconds]);

  return (
      <div className="columns">
        <div className="column">
          <section className="section">
            <div className="container">
              <h2 className="title">Current</h2>
              <CurrentAmountCounter currency={options.exchangeCurrency} value={currentAmount}/>
              <div>Seconds: {Math.floor(seconds)}</div>
            </div>
          </section>
        </div>
        <div className="column">
          <section className="section">
            <div className="container">
              <h3 className="title">Options</h3>
              <TimerOptions {...options} />
            </div>
          </section>
          <section className="section">
            <div className="container">
              <h3 className="title">Controls</h3>
              <div className="buttons">
                <button className="button is-success" disabled={running} onClick={startTimer}>Start</button>
                <button className="button is-danger" disabled={!running} onClick={stopTimer}>Stop</button>
                <button className="button is-info"
                        onClick={() => {
                          setCurrentAmount(0);
                          resetTimer()
                        }}>Reset
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}