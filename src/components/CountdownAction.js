import React from 'react'

import { FaPlay, FaPause, FaUndo } from 'react-icons/fa';
import styles from './CountdownAction.module.css';

function CountdownAction({ isStart, start, pause, reset }) {
  return (
    <div className={styles.CountdownAction}>
      {
        !isStart 
        ? <FaPlay className={styles.button} onClick={start} />
        : <FaPause className={styles.button} onClick={pause} />
      }
      <FaUndo className={styles.button} onClick={reset} />
    </div>
  )
}

export default CountdownAction
