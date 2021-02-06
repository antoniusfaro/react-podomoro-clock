import React, { createContext, useReducer } from 'react';

import PodomoroClock from '../components/PodomoroClock';

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  longBreakLength: 15,
  countdown: 25 * 60,
  podomoroCount: 3,
  isBreak: false,
  isStart: false
};

const setTimerLength = (state, action) => {
  switch (action) {
    case 'INCREMENT_SESSION':
    case 'INCREMENT_BREAK':
    case 'INCREMENT_LONG_BREAK':
      return state < 60 ? state + 1 : state;
    case 'DECREMENT_SESSION':
    case 'DECREMENT_BREAK':
    case 'DECREMENT_LONG_BREAK':
      return state > 1 ? state - 1 : state;
    default: return state;
  }
}

const setCountdown = (state, action) => {
  switch (action) {
    case 'INCREMENT_SESSION':
      return state + 60;
    case 'DECREMENT_SESSION':
      return state - 60;
    case 'COUNTDOWN_START':
      return state - 1;
    case 'COUNTDOWN_SWAP':
      if (state.isBreak) {
        return state.sessionLength * 60;
      } else {
        if (state.podomoroCount + 1 === 4) {
          return state.longBreakLength * 60;
        } else {
          return state.breakLength * 60;
        }
      }
    default:
      return state
  }
}

const setPodomoroCount = (state, action) => {
  switch (action) {
    case 'COUNTDOWN_SWAP':
      if (state.isBreak) {
        return state.podomoroCount
      } else {
        if (state.podomoroCount + 1 === 4) {
          return initialState.podomoroCount
        } else {
          return state.podomoroCount + 1
        }
      }
    default: return state;
  }
}

const reducer = (state, action) => {
  switch (action) {
    case 'INCREMENT_SESSION':
      if (!state.isStart) {
        return {
          ...state,
          sessionLength: setTimerLength(state.sessionLength, action),
          countdown: setCountdown(state.countdown, action)
        }
      }
      return state;
      
    case 'DECREMENT_SESSION':
      if (!state.isStart) {
        return {
          ...state,
          sessionLength: setTimerLength(state.sessionLength, action),
          countdown: setCountdown(state.countdown, action)
        }
      }
      return state;

    case 'INCREMENT_BREAK': 
      if (!state.isStart) {
        return {
          ...state,
          breakLength: state.isStart ? state.breakLength : setTimerLength(state.breakLength, action)
        }
      } 
      return state;

    case 'DECREMENT_BREAK': 
      if (!state.isStart) {
        return {
          ...state,
          breakLength: state.isStart ? state.breakLength : setTimerLength(state.breakLength, action)
        }
      }
      return state;

    case 'INCREMENT_LONG_BREAK':
      if (!state.isStart) {
        return {
          ...state,
          longBreakLength: setTimerLength(state.longBreakLength, action)
        }
      }
      return state;

    case 'DECREMENT_LONG_BREAK':
      if (!state.isStart) {
        return {
          ...state,
          longBreakLength: setTimerLength(state.longBreakLength, action)
        }
      }
      return state;

    case 'COUNTDOWN_START':
      return {
        ...state,
        countdown: setCountdown(state.countdown, action),
        isStart: true
      }

    case 'COUNTDOWN_PAUSE':
      return {
        ...state,
        isStart: false
      }

    case 'COUNTDOWN_SWAP': 
      return {
        ...state,
        isBreak: !state.isBreak,
        podomoroCount: setPodomoroCount(state, action),
        countdown: setCountdown(state, action)
      }

    case 'RESET_COUNTDOWN':
      return initialState;
    default: 
      return state;
  }
}

export const DispatchContext = createContext('');
export const IsStartContext = createContext('');

function PodomoroClockContainer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { countdown, sessionLength, breakLength, longBreakLength, podomoroCount, isBreak, isStart } = state;
  const currentTimer = !isBreak ? 'Session' : podomoroCount + 1 === 4 ? 'Long Break' : 'Break';

  return (
    <DispatchContext.Provider value={dispatch}>
      <IsStartContext.Provider value={isStart}>
        <PodomoroClock 
          countdown={countdown} 
          sessionLength={sessionLength}
          breakLength={breakLength}
          longBreakLength={longBreakLength}
          currentTimer={currentTimer} 
          dispatch={dispatch}
          />
      </IsStartContext.Provider>
    </DispatchContext.Provider>
  )
}

export default PodomoroClockContainer
