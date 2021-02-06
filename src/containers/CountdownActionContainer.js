import React, { useContext, useRef } from 'react'

import CountdownAction from '../components/CountdownAction';
import { IsStartContext } from './PodomoroClockContainer';
import { DispatchContext } from './PodomoroClockContainer';

function CountdownActionContainer() {
  const tick = useRef();

  const isStart = useContext(IsStartContext);
  const dispatch = useContext(DispatchContext);

  const handleStart = () => {
    tick.current = setInterval(() => {
      dispatch('COUNTDOWN_START');
    }, 1000);
  }

  const handlePause = () => {
    clearInterval(tick.current);
    dispatch('COUNTDOWN_PAUSE');
  }

  const handleReset = () => {
    clearInterval(tick.current);
    dispatch('RESET_COUNTDOWN');
  }

  return (
    <CountdownAction isStart={isStart} start={handleStart} pause={handlePause} reset={handleReset} />
  )
}

export default CountdownActionContainer
