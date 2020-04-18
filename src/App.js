import React from 'react';
import {Column, Section, Button, Icon} from 'rbx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import SiteNav from './components/SiteNav'
import EarningsTimer from "./components/EarningsTimer";
import './App.scss';

function App() {
  return (
      <div className="App">
        <SiteNav/>
        <Section>
          <Column.Group vcentered multiline>
            <EarningsTimer timerName="Timer 1"/>
            <Column desktop={{size: 3}} fullhd={{size: 2}}>
              <Button.Group align="centered">
                <Button color="light" size="large">
                  <Icon size="large">
                    <FontAwesomeIcon icon={faPlus}/>
                  </Icon>
                </Button>
              </Button.Group>
            </Column>
          </Column.Group>
        </Section>
      </div>
  );
}

export default App;
