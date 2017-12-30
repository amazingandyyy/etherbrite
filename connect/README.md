# etherbrite-connect

## Installation
```
npm i --save etherbrite-connect
or 
yarn add etherbrite-connect
```

## Usage
```javascript
// configuration
import { createEvent, eventListener } from 'etherbrite-connect';
import Web3 from 'web3';

// init provider first
const provider = new Web3.providers.HttpProvider("http://localhost:8545");

// use it
let deplyedContract = await createEvent(provider)(name, location, date, ticketNum, ticketPrice);
let contractAddr = deplyedContract.address;
let ContractCreatedEvent = await eventListener(provider)(contractAddr, 'ContractCreated');
```

## Sample Code
are available in the test.js

### author 
Andy Chen([amazingandyyy](https://github.com/amazingandyyy))

## LICENSE
MIT