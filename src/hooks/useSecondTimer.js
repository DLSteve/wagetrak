import {useState, useRef, useCallback} from 'react';

export default function useSecondTimer(initSeconds = 0) {
  const [seconds, setSeconds] = useState(initSeconds);
  const [running, setRunning] = useState(false);

  const counterRef = useRef();
  const previousTimeRef = useRef(null);
  const millisecondsRef = useRef(0);

  const update = useCallback(time => {
    if (previousTimeRef?.current) {
      const deltaTime = time - previousTimeRef.current;

      if(millisecondsRef.current >= 1000) {
        setSeconds(prevSeconds => prevSeconds + (millisecondsRef.current / 1000));
        millisecondsRef.current = 0;
      }

      millisecondsRef.current = millisecondsRef.current + deltaTime;
    }
    previousTimeRef.current = time;

    // noinspection JSValidateTypes
    counterRef.current = requestAnimationFrame(update);
  }, []);

  const startTimer = () => {
    // noinspection JSValidateTypes
    counterRef.current = requestAnimationFrame(update);
    setRunning(true)
  };

  const stopTimer = () => {
    cancelAnimationFrame(counterRef.current);
    previousTimeRef.current = null;
    setRunning(false)
  };

  const resetTimer = () => {
    cancelAnimationFrame(counterRef.current);
    setSeconds(0);
    counterRef.current = null;
    previousTimeRef.current = null;
    millisecondsRef.current = 0;
    setRunning(false)
  };

  return {
    running,
    seconds,
    startTimer,
    stopTimer,
    resetTimer
  }
}