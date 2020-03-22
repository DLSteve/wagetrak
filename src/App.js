import React, {useState, useRef, useEffect} from 'react';
import useSecondTimer from "./hooks/useSecondTimer";

import './App.css';

import CurrentAmountCounter from './components/CurrentAmountCounter';
import CurrencySelect from './components/CurrencySelect'

async function fetchExchangeRate(base, exchange) {
  const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${exchange}`, {
    credentials: 'omit'
  });
  return await response.json();
}

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeCurrency, setExchangeCurrency] = useState('USD');
  const [rate, setRate] = useState(20.00);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [currentAmount, setCurrentAmount] = useState(0);

  const {
    running,
    seconds,
    startTimer,
    stopTimer,
    resetTimer
  } = useSecondTimer();

  const handleBaseCurrency = event => {
    let base = event.target.value;
    setBaseCurrency(base);
    updateExchangeRate(base, exchangeCurrency)
  };

  const handleExchangedCurrency = event => {
    let exchange = event.target.value;
    setExchangeCurrency(exchange);
    updateExchangeRate(baseCurrency, exchange)
  };

  const updateExchangeRate = (base, exchange) => {
    fetchExchangeRate(base, exchange)
        .then((data) => {
          setExchangeRate(data.rates[exchange]);
        })
  };

  useEffect(() => {
    const adjustedRate = rate * exchangeRate;
    const ratePerSecond = adjustedRate / 3600;
    setCurrentAmount(ratePerSecond * Math.floor(seconds))
  }, [exchangeRate, rate, seconds]);

  return (
      <div className="App">
        <div className="grid-container">
          <div className="counter-options">
            <h3>Options:</h3>
            <label htmlFor="pay-rate">Hourly Pay Rate: </label>
            <input type="number" id="pay-rate" name="tentacles" min="0" defaultValue={rate} onChange={event => setRate(parseInt(event.target.value, 10))} />
            <CurrencySelect label="Base Currency" currency={baseCurrency} handleCurrency={handleBaseCurrency}/>
            <CurrencySelect label="Converted Currency" currency={exchangeCurrency} handleCurrency={handleExchangedCurrency}/>
          </div>
          <div className="current-amount">
            <h3>Current:</h3>
            <CurrentAmountCounter currency={exchangeCurrency} value={currentAmount}/>
            <div>Seconds: {Math.floor(seconds)}</div>
          </div>
          <div className="counter-controls">
            <h3>Controls:</h3>
            <button disabled={running} onClick={() => {
              startTimer()
            }}>Start</button>
            <button disabled={!running} onClick={() => {
              stopTimer()
            }}>Stop</button>
            <button onClick={() => {
              setCurrentAmount(0);
              resetTimer()
            }}>Reset</button>
          </div>
        </div>
      </div>
  );
}

export default App;
