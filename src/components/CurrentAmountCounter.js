import React from 'react';

export default function CurrentAmountCounter({currency, value}) {
  return (
      <span className="current-amount-counter">
      {new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: currency
      }).format(value)}
    </span>
  )
}