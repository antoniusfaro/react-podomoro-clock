import React from 'react'

import CountdownActionContainer from '../containers/CountdownActionContainer';
import styles from './Countdown.module.css';

function Countdown({ currentTimer, minutes, seconds }) {
  return (
    <div className={styles.Countdown}>
      <h1 className={styles.Countdown_label}>{currentTimer}</h1>
      <h2 className={styles.Countdown_timer}>{minutes}:{seconds}</h2>
      <CountdownActionContainer />
    </div>
  )
}

export default Countdown
