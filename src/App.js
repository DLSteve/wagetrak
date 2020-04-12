import React from 'react';

import SiteNav from './components/SiteNav'
import EarningsTimer from "./components/EarningsTimer";
import './App.scss';

function App() {
  return (
      <div className="App">
        <SiteNav/>
        <EarningsTimer/>
      </div>
  );
}

export default App;
