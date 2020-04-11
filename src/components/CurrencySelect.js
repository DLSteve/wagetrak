import React from 'react';
import {Field, Label, Control, Select} from "rbx";

const CURRENCY_LIST = [
  {"id": "USD", "name": "USD - United States dollar"},
  {"id": "EUR", "name": "EUR - European Union Euro"},
  {"id": "GBP", "name": "GBP - Pound Sterling"},
  {"id": "JPY", "name": "JPY - Japanese Yen"},
  {"id": "BGN", "name": "BGN - Bulgaria Lev"},
  {"id": "CZK", "name": "CZK - Czech Republic Koruna"},
  {"id": "DKK", "name": "DKK - Danish Krone"},
  {"id": "HUF", "name": "HUF - Hungary Forint"},
  {"id": "PLN", "name": "PLN - Polish Zloty"},
  {"id": "RON", "name": "RON - Romanian Leu"},
  {"id": "SEK", "name": "SEK - Sweden Krona"},
  {"id": "CHF", "name": "CHF - Swiss Franc"},
  {"id": "ISK", "name": "ISK - Icelandic Krona"},
  {"id": "NOK", "name": "NOK - Norwegian Krone"},
  {"id": "HRK", "name": "HRK - Croatian Kuna"},
  {"id": "RUB", "name": "RUB - Russian Ruble"},
  {"id": "TRY", "name": "TRY - Turkish Lira"},
  {"id": "AUD", "name": "AUD - Australian Dollar"},
  {"id": "BRL", "name": "BRL - Brazilian Real"},
  {"id": "CAD", "name": "CAD - Canadian Dollar"},
  {"id": "CNY", "name": "CNY - Chinese Yuan Renminbi"},
  {"id": "HKD", "name": "HKD - Hong Kong Dollar"},
  {"id": "IDR", "name": "IDR - Indonesian Rupiah"},
  {"id": "ILS", "name": "ILS - Israeli Shekel"},
  {"id": "INR", "name": "INR - India Rupee"},
  {"id": "KRW", "name": "KRW - South Korean Won"},
  {"id": "MXN", "name": "MXN - Mexican Peso"},
  {"id": "MYR", "name": "MYR - Malaysian Ringgit"},
  {"id": "NZD", "name": "NZD - New Zealand Dollar"},
  {"id": "PHP", "name": "PHP - Philippine Peso"},
  {"id": "SGD", "name": "SGD - Singapore Dollar"},
  {"id": "THB", "name": "THB - Thai Baht"},
  {"id": "ZAR", "name": "ZAR - South African Rand"}
];

export default function CurrencySelect({label, currency, handleCurrency}) {
  return (
      <Field>
        <Label>{label}</Label>
        <Control>
          <Select.Container>
            <Select defaultValue={currency} onChange={handleCurrency}>{
              CURRENCY_LIST.map((obj) => {
                return <Select.Option key={obj.id} value={obj.id}>{obj.name}</Select.Option>
              })
            }</Select>
          </Select.Container>
        </Control>
      </Field>
  )
}