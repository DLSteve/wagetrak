import {useState, useEffect, useCallback} from 'react';

async function fetchExchangeRate(base, exchange) {
  const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${exchange}`, {
    credentials: 'omit'
  });
  return await response.json();
}

export default function useTimerOptions({defaultBaseCurrency = 'USD', defaultExchangeCurrency = 'USD', defaultRate = 20.00}) {
  const [baseCurrency, setBaseCurrency] = useState(defaultBaseCurrency);
  const [exchangeCurrency, setExchangeCurrency] = useState(defaultExchangeCurrency);
  const [rate, setRate] = useState(defaultRate);
  const [exchangeRate, setExchangeRate] = useState(1);

  const updateExchangeRate = useCallback((base, exchange) => {
    fetchExchangeRate(base, exchange)
        .then((data) => {
          setExchangeRate(data.rates[exchange]);
        })
  }, []);

  useEffect(() => {
    updateExchangeRate(defaultBaseCurrency, defaultExchangeCurrency)
  }, [defaultBaseCurrency, defaultExchangeCurrency, updateExchangeRate]);

  return {
    baseCurrency,
    setBaseCurrency,
    exchangeCurrency,
    setExchangeCurrency,
    rate,
    setRate,
    exchangeRate,
    updateExchangeRate
  }
}