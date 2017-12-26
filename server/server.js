import express from 'express';
import config from './config';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(web3Provider);
const coinbase = web3.eth.coinbase;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send('server!');
})

app.post('/createEvent', (req, res) => {
  if (!req.body.name) return res.sendStatus(500);
  createEvent(req.body)
    .then(addr=>{
      res.send({contract_Address: addr})
    })
    .catch((err)=>{
      res.status(500).send(err);
    })
})

function createEvent(info) {
  const { name, location, date, ticketNum, ticketPrice } = info;

  const DEFAULT_GAS = 4000000;
  const EventContractABI = require(`${config.contractPath}/Event.json`);
  let EventContract = TruffleContract(EventContractABI);
  EventContract.setProvider(web3Provider);
  return EventContract.new(
    name,
    location,
    date,
    ticketNum,
    ticketPrice,
    {
      from: coinbase,
      gas: DEFAULT_GAS
    }
  )
  .then(inst => {
    return inst.address;
  })
  .catch(e => {
    console.error(e);
    throw(e.message);
  })
}

app.use(errorHandler)

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', {
    error: err
  })
}

const server = app.listen(config.PORT, () => {
  console.log(`App is listening on port ${server.address().port}...`);
});