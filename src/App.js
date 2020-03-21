import React, {useState, useRef, useEffect} from 'react';

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
  const [running, setRunning] = useState(false);
  const [rate, setRate] = useState(20.00);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [seconds, setSeconds] = React.useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);

  const counterRef = useRef();
  const previousTimeRef = useRef(null);
  const millisecondsRef = useRef(0);

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

  const update = time => {
    if (previousTimeRef?.current) {
      const deltaTime = time - previousTimeRef.current;

      if(millisecondsRef.current >= 1000) {
        setSeconds(prevSeconds => prevSeconds + (millisecondsRef.current / 1000));
        millisecondsRef.current = 0;
      }

      millisecondsRef.current = millisecondsRef.current + deltaTime;
    }
    previousTimeRef.current = time;

    // noinspection JSValidateTypes
    counterRef.current = requestAnimationFrame(update);
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
              // noinspection JSValidateTypes
              counterRef.current = requestAnimationFrame(update);
              setRunning(true)
            }}>Start</button>
            <button disabled={!running} onClick={() => {
              cancelAnimationFrame(counterRef.current);
              previousTimeRef.current = null;
              setRunning(false)
            }}>Stop</button>
            <button onClick={() => {
              setCurrentAmount(0);
              cancelAnimationFrame(counterRef.current);
              setSeconds(0);
              counterRef.current = null;
              previousTimeRef.current = null;
              millisecondsRef.current = 0;
              setRunning(false)
            }}>Reset</button>
          </div>
        </div>
      </div>
  );
}

export default App;
