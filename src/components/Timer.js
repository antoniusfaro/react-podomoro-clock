import React from 'react';

import styles from './Timer.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Timer({ label, length, increment, decrement }) {
  return (
    <div className={styles.Timer}>
      <h3 className={styles.Timer_label}>{label} Length</h3>
      <div className={styles.Timer_action}>
        <FaChevronLeft className={styles.Timer_button} onClick={decrement} />
        <h4 className={styles.Timer_length}>{length}</h4>
        <FaChevronRight className={styles.Timer_button} onClick={increment} />
      </div>
    </div>
  )
}

export default Timer

