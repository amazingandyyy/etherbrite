import { web3, coinbase, DEFAULT_GAS, EventContract } from './config';

function createEvent(name, location, date, ticketNum, ticketPriceInEther) {
  let ticketPriceInWei = web3.toWei(ticketPriceInEther, 'ether');
  return EventContract.new(
    name,
    location,
    date,
    parseInt(ticketNum),
    parseInt(ticketPriceInWei),
    {
      from: coinbase,
      gas: DEFAULT_GAS
    }
  )
  .then(inst => {
    return inst;
  })
  .catch(e => {
    console.error(e);
    throw(e.message);
  })
}

export { createEvent };