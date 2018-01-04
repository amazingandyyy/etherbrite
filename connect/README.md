# etherbrite-connect
An Async JavaScript library for interacting with the Etherbrite protocol.

## Installation
```
npm i --save etherbrite-connect
or 
yarn add etherbrite-connect
```

## Don't forget setup init a providor with web3 before any API;
```javascript
// configuration
import Web3 from 'web3';
const provider = new Web3.providers.HttpProvider("http://localhost:8545");

import { eventContract } from 'etherbrite-connect'; // import eventContract class from 'etherbrite-connect
const eventContractInst = new eventContract(provider); // init an eventContract instance
```

## APIs
- Create an event
```javascript
eventContractInst.createEvent(name, location, date, ticketNum, ticketPrice)
  .then(inst=>{
    if(inst.options.address) return console.log(`Deplyed Contract Address ${inst.options.address}`, inst);
  })
  .catch(console.error);
```
- Buy a ticket
  - usage
  ```javascript
  let dataObj = { first: 'Andy', last: 'Chen', email: 'sample@email.com' };
  eventContractInst.register(ContractAddress, dataObj)
    .then(result=>console.log(result))
    .catch(console.error);
  ```
 - sampe response
  ``` javascript
  { transactionHash: '0x5494bc4a76d3a85546cfd89b1d17b63a1aa55f5df372d434182839aa874905c7',
      transactionIndex: 0,
      blockHash: '0x7a9638f641431884e133bc8c29f22df7199be4665b5927090d6e044167af3fd3',
      blockNumber: 11,
      gasUsed: 105643,
      cumulativeGasUsed: 105643,
      contractAddress: null,
      status: 1,
      events:
       { NewRegistration:
          { logIndex: 0,
            transactionIndex: 0,
            transactionHash: '0x5494bc4a76d3a85546cfd89b1d17b63a1aa55f5df372d434182839aa874905c7',
            blockHash: '0x7a9638f641431884e133bc8c29f22df7199be4665b5927090d6e044167af3fd3',
            blockNumber: 11,
            address: '0xE39e06858989b5eB9C7C056240aC04578D836D57',
            type: 'mined',
            id: 'log_adbe8fef',
            returnValues: [Object],
            event: 'NewRegistration',
            signature: '0x127d2d02c713b5cea468d887c24a55945cc57fe875c38067b84648cf4f936661',
            raw: [Object] } } }
  ```
- Search for one existing user
 - usage
  ```javascript
  let dataObj = { address: "0x5911a943ba6bdsamp1e150269a087047bdsamp1e" }
  eventContractInst.search(ContractAddress, dataObj)
    .then(result=>console.log(result))
    .catch(console.error);
  ```
- sample repsonse
  ```javascript
  {
      '0': 'Andy', // first name
      '1': 'Chen', // last name
      '2': 'sample@email.com', // email
      '3': false  // checkedin status
  }
  ```

- Checkin one existing user
 - usage
  ```javascript
  let dataObj = { address: "0x5911a943ba6bdsamp1e150269a087047bdsamp1e" }
  eventContractInst.checkin(ContractAddress, dataObj)
    .then(result=>console.log(result)) // 
    .catch(console.error);
  ```
- sample repsonse
  ```javascript
  { transactionHash: '0x6242018138e86ad184d73661ac403cc18e8557bf271926b325741ef028b28cc0',
      transactionIndex: 0,
      blockHash: '0x3f2aad58157335ac4356391f1a8b64fee0736784735a6ab6adeda847dcb63ddf',
      blockNumber: 24,
      gasUsed: 50378,
      cumulativeGasUsed: 50378,
      contractAddress: null,
      status: 1,
      events:
       { CheckedIn:
          { logIndex: 0,
            transactionIndex: 0,
            transactionHash: '0x6242018138e86ad184d73661ac403cc18e8557bf271926b325741ef028b28cc0',
            blockHash: '0x3f2aad58157335ac4356391f1a8b64fee0736784735a6ab6adeda847dcb63ddf',
            blockNumber: 24,
            address: '0xd75b896e948631049117CDC8A2765b0323Be166D',
            type: 'mined',
            id: 'log_2ff0196c',
            returnValues: [Object],
            event: 'CheckedIn',
            signature: '0x27e2f86749fa88ec6d05509790439db523bba85f9371575f0e6610b483a0fdf0',
            raw: [Object] } } }
  ```

## Sample Code
are available in the test.js

### author 
Andy Chen([amazingandyyy](https://github.com/amazingandyyy))

## LICENSE
MIT