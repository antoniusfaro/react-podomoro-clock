import React from 'react'

import CountdownContainer from '../containers/CountdownContainer';
import Title from './Title';
import Timer from './Timer';
import styles from './PodomoroClock.module.css';

function PodomoroClock({ countdown, sessionLength, breakLength, longBreakLength, currentTimer,  dispatch }) {
  return (
    <div className={styles.PodomoroClock}>
      <Title />
      <CountdownContainer 
        countdown={countdown} 
        currentTimer={currentTimer} 
        dispatch={dispatch}
      />
      <Timer 
        label='Session' 
        length={sessionLength} 
        increment={() => dispatch('INCREMENT_SESSION')} 
        decrement={() => dispatch('DECREMENT_SESSION')} 
      />
      <Timer 
        label='Break' 
        length={breakLength}
        increment={() => dispatch('INCREMENT_BREAK')} 
        decrement={() => dispatch('DECREMENT_BREAK')} 
      />
      <Timer 
        label='Long Break'
        length={longBreakLength}
        increment={() => dispatch('INCREMENT_LONG_BREAK')}
        decrement={() => dispatch('DECREMENT_LONG_BREAK')}
      />
    </div>
  )
}

export default PodomoroClock
