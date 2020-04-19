import React from 'react'

import SiteNav from './components/SiteNav'
import TimerGrid from './components/TimerGrid'
import './App.scss'

function App() {
  return (
      <div className="App">
        <SiteNav/>
        <TimerGrid/>
      </div>
  );
}

export default App
