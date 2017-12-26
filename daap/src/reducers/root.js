import { ROOT } from './types'

const INIT_STATE = {
  msg: 'redux works'
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ROOT:
      return { ...state, msg: action.payload }
    default:
      return state
  }
}
