import React, {useState, useCallback} from 'react';
import {Container, Field, Label, Control, Input} from "rbx";

import CurrencySelect from "./CurrencySelect";
import OptionsModalManager from './OptionsModalManager'

export default function TimerOptions({baseCurrency, setBaseCurrency, exchangeCurrency, setExchangeCurrency, rate, setRate, updateExchangeRate}) {
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
  }, [baseCurrency, exchangeCurrency, rate]);

  const closeModal = () => {
    setTempBaseCurrency('');
    setTempExchangeCurrency('');
    setTempRate(0);
  };

  const closeModalAndSave = useCallback(() => {
    setBaseCurrency(tempBaseCurrency);
    setExchangeCurrency(tempExchangeCurrency);
    setRate(tempRate);
    updateExchangeRate(tempBaseCurrency, tempExchangeCurrency);
    closeModal()
  }, [setBaseCurrency, setExchangeCurrency, setRate, tempBaseCurrency, tempExchangeCurrency, tempRate, updateExchangeRate]);

  return (
      <OptionsModalManager onOpen={openModal} onClose={closeModal} onSave={closeModalAndSave}>
        <Container>
          <Field>
            <Label>Hourly Pay Rate</Label>
            <Control>
              <Input className="input" type="number" id="pay-rate" min="0"
                     defaultValue={tempRate}
                     onChange={event => setTempRate(parseInt(event.target.value, 10))}/>
            </Control>
          </Field>
          <Field horizontal>
            <Field.Body>
              <CurrencySelect label="Base Currency" currency={tempBaseCurrency}
                              handleCurrency={handleBaseCurrency}/>
              <CurrencySelect label="Converted Currency" currency={tempExchangeCurrency}
                              handleCurrency={handleExchangedCurrency}/>
            </Field.Body>
          </Field>
        </Container>
      </OptionsModalManager>
  )
}