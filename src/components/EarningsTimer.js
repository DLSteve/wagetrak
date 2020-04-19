import React, {useState, useEffect, memo} from 'react'
import {Column, Box, Button, Icon, Block, Heading} from 'rbx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUndo, faPlay, faStop, faTrashAlt} from '@fortawesome/free-solid-svg-icons'

import useSecondTimer from '../hooks/useSecondTimer'
import useTimerOptions from '../hooks/useTimerOptions'
import CurrentAmountCounter from './CurrentAmountCounter'
import TimerOptions from './TimerOptions'


const EarningsTimer = memo(({id, onDelete, timerName = "No Name"}) => {
  const [currentAmount, setCurrentAmount] = useState(0)
  const options = useTimerOptions({})
  const {
    running,
    seconds,
    startTimer,
    stopTimer,
    resetTimer
  } = useSecondTimer()

  useEffect(() => {
    const adjustedRate = options.rate * options.exchangeRate
    const ratePerSecond = adjustedRate / 3600
    setCurrentAmount(ratePerSecond * Math.floor(seconds))
  }, [options.exchangeRate, options.rate, seconds])

  return (
      <Column desktop={{size: 3}} fullhd={{size: 2}}>
        <Box>
          <Block>
            <Heading>{timerName}</Heading>
            <CurrentAmountCounter currency={options.exchangeCurrency} value={currentAmount}/>
            <div>Seconds: {Math.floor(seconds)}</div>
            <div>Exchange Rate: {options.exchangeRate}</div>
          </Block>
          <Block>
            <Button.Group>
              {running
                  ? <Button size="small" onClick={stopTimer}>
                    <Icon size="small">
                      <FontAwesomeIcon icon={faStop}/>
                    </Icon>
                  </Button>
                  : <Button size="small" onClick={startTimer}>
                    <Icon size="small">
                      <FontAwesomeIcon icon={faPlay}/>
                    </Icon>
                  </Button>}
              <Button size="small"
                      onClick={() => {
                        setCurrentAmount(0);
                        resetTimer()
                      }}>
                <Icon size="small">
                  <FontAwesomeIcon icon={faUndo}/>
                </Icon>
              </Button>
              <TimerOptions {...options} />
              <Button color="danger" size="small"
                      onClick={() => onDelete((timers) => timers.filter(t => t.id !== id))}>
                <Icon size="small">
                  <FontAwesomeIcon icon={faTrashAlt}/>
                </Icon>
              </Button>
            </Button.Group>
          </Block>
        </Box>
      </Column>
  );
})

export default EarningsTimer