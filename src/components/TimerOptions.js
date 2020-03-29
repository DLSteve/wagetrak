import React, {useState, useCallback} from 'react';
import CurrencySelect from "./CurrencySelect";

export default function TimerOptions({baseCurrency, setBaseCurrency, exchangeCurrency, setExchangeCurrency, rate, setRate, updateExchangeRate}) {
  const [active, setActive] = useState(false);
  const [tempBaseCurrency, setTempBaseCurrency] = useState(baseCurrency);
  const [tempExchangeCurrency, setTempExchangeCurrency] = useState(exchangeCurrency);
  const [tempRate, setTempRate] = useState(rate);

  const handleBaseCurrency = event => {
    let base = event.target.value;
    setTempBaseCurrency(base);
  };

  const handleExchangedCurrency = event => {
    let exchange = event.target.value;
    setTempExchangeCurrency(exchange);
  };

  const openModal = useCallback(() => {
    setTempBaseCurrency(baseCurrency);
    setTempExchangeCurrency(exchangeCurrency);
    setTempRate(rate);
    setActive(true);
  }, [baseCurrency, exchangeCurrency, rate]);

  const closeModal = () => {
    setTempBaseCurrency('');
    setTempExchangeCurrency('');
    setTempRate(0);
    setActive(false);
  };

  const closeModalAndSave = useCallback(() => {
    setBaseCurrency(tempBaseCurrency);
    setExchangeCurrency(tempExchangeCurrency);
    setRate(tempRate);
    updateExchangeRate(tempBaseCurrency, tempExchangeCurrency);
    closeModal()
  }, [setBaseCurrency, setExchangeCurrency, setRate, tempBaseCurrency, tempExchangeCurrency, tempRate, updateExchangeRate]);

  return (
      <div>
        <div className={`modal ${active ? "is-active" : ""}`}>
          <div className="modal-background"/>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Options</p>
              <button className="delete" aria-label="close" onClick={closeModal}/>
            </header>
            <section className="modal-card-body">
              <div className="container">
                <div className="field">
                  <label className="label" htmlFor="pay-rate">Hourly Pay Rate</label>
                  <div className="control">
                    <input className="input" type="number" id="pay-rate" name="tentacles" min="0"
                           defaultValue={tempRate}
                           onChange={event => setTempRate(parseInt(event.target.value, 10))}/>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-body">
                    <CurrencySelect label="Base Currency" currency={tempBaseCurrency}
                                    handleCurrency={handleBaseCurrency}/>
                    <CurrencySelect label="Converted Currency" currency={tempExchangeCurrency}
                                    handleCurrency={handleExchangedCurrency}/>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={closeModalAndSave}>Save changes</button>
              <button className="button" onClick={closeModal}>Cancel</button>
            </footer>
          </div>
        </div>
        <button className="button is-primary" onClick={openModal}>Options</button>
      </div>
  )
}