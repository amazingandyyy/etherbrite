import { createEvent } from 'etherbrite-connect';

export default (req, res, next) => {
  let { name, location, date, ticketNum, ticketPrice } = req.body;
  createEvent(name, location, date, ticketNum, ticketPrice)
    .then(contract=>{
      res.send({event_contract_Address: contract.address, tx: contract.transactionHash});
    })
    .catch(next);
}