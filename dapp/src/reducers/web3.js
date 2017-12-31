import { ETH_CONNECT } from './types'

const INIT_STATE = {
}

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ETH_CONNECT:
      // action.payload.accounts().then(accounts => console.log('accounts', accounts));		
      return { ...state, ...action.payload }
    default:
      return state
  }
}
