import React, {useCallback, useState} from 'react';
import {Column, Section, Button, Icon} from 'rbx';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';

import EarningsTimer from "./EarningsTimer";


export default function TimerGrid() {
  const [timers, setTimers] = useState([{id: uuidv4(), name: "Timer 1"}])
  const [timerCount, setTimerCount] = useState(1)


  const handleAdd = useCallback(() => {
    setTimers([...timers, {id: uuidv4(), name: `Timer ${timerCount + 1}`}])
    setTimerCount(timerCount + 1)
  }, [timerCount, timers])

  return (
      <Section>
        <Column.Group vcentered multiline>
          {timers && timers.map(t => (
            <EarningsTimer key={t.id} id={t.id} onDelete={setTimers} timerName={t.name}/>
          ))}
          <Column desktop={{size: 3}} fullhd={{size: 2}}>
            <Button.Group align="centered">
              <Button onClick={handleAdd} color="light" size="large">
                <Icon size="large">
                  <FontAwesomeIcon icon={faPlus}/>
                </Icon>
              </Button>
            </Button.Group>
          </Column>
        </Column.Group>
      </Section>
  )
}