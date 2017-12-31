import {
  ROOT,
  ETH_CONNECT
} from '../reducers/types'
import Eth from 'ethjs'
import Web3 from 'web3';

export const changeRootMsg = () => function (dispatch) {
  return dispatch({ type: ROOT, payload: 'redux works with actions' })
}

export const connectEth = () => function (dispatch) {
  let eth;
  let web3;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof window.web3 !== 'undefined' && typeof window.web3.currentProvider !== 'undefined') {
    let provider = window.web3.currentProvider;
    eth = new Eth(provider);
    web3 = new Web3(provider);
  } else {
    eth = new Eth(new Eth.HttpProvider('http://localhost:8545'))
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  return dispatch({ type: ETH_CONNECT, payload: web3 });
}
