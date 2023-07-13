const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good + 1
      return {...state,good:newGood}
    case 'OK':
      const newOK = state.ok + 1
      return {...state,ok:newOK}
    case 'BAD':
      const newBad = state.bad + 1
      return {...state,bad:newBad}
    case 'ZERO':
      return state
    case 'RESET':
      return {ok:0,bad:0,good:0}
    default: return state
  }
  
}

export default counterReducer
