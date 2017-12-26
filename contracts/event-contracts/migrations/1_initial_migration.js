const EventContract = artifacts.require('./Event.sol');

module.exports = function(deployer) {
  let name = 'Etherbrite Event Testing';
  let location = 'Fake San Francisco';
  let date = 'Jan. 1, 2020';
  let ticketNum = 10;
  let ticketPrice = web3.toWei(0.001, 'ether');
  
  deployer.deploy(EventContract, name, location, date, ticketNum, ticketPrice)
  .then(() => {
    // const instance = await EventContract.deployed();
    console.log('---> deployed <---');
  })
};
