import React, { useEffect } from 'react';

import Countdown from '../components/Countdown';

function CountdownContainer({ countdown, currentTimer, dispatch }) {
  useEffect(() => {
    console.log(countdown)
    if (countdown < 0) {
      const beep = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');
      beep.pause();
      beep.currentTime = 0;
      beep.play();
      dispatch('COUNTDOWN_SWAP');
    }
  });

  let minutes = Math.floor(countdown / 60);
  minutes = minutes < 10 ? '0' + minutes : minutes;

  let seconds = countdown % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return (
    <Countdown 
      currentTimer={currentTimer}
      minutes={minutes}
      seconds={seconds}
    />
  )
}

export default CountdownContainer
