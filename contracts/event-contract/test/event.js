const EventContract = artifacts.require("./Event.sol");
const Web3 = require('web3');

contract('Event contract', function(accounts) {
  let holder;
  let buyer;
  let stranger;
  let eventInstance;

  beforeEach('init', async function() {
    holder = accounts[0];
    buyer = accounts[1];
    stranger = accounts[2];
    eventInstance = await EventContract.deployed();
  });

  it('contract should be deployed with details', async function() {
      assert.isTrue(await eventInstance.name.call() == 'Etherbrite Event Testing');
      assert.isTrue(await eventInstance.location.call() == 'Fake San Francisco');
      assert.isTrue(await eventInstance.date.call() == 'Jan. 1, 2020');
  });

  it('register one participant and search for it publicly, should return no email', async function() {
    let reg_result = await eventInstance.register(
      'Andy', 'Chen', 'amazingandyyy@gmail.com',
      {
        value: web3.toWei(0.001, "ether"),
        from: buyer
      }
    );
    assert.isTrue(reg_result.tx.length > 10);
    let publid_find_result = await eventInstance.search.call(buyer, {
      from: stranger
    });
    assert.isTrue(publid_find_result[0] == 'Private');
    assert.isTrue(publid_find_result[1] == 'Private');
    assert.isTrue(publid_find_result[2] == 'Private');
    assert.isTrue(publid_find_result[3] == false);
  });
  it('register one participant and search for it privately', async function() {
    let reg_result = await eventInstance.register(
      'Andy', 'Chen', 'amazingandyyy@gmail.com',
      {
        value: web3.toWei(0.001, "ether"),
        from: buyer
      }
    );
    assert.isTrue(reg_result.tx.length > 10);

    let self_find_result = await eventInstance.search.call(buyer, {
      from: buyer
    });
    assert.isTrue(self_find_result[0] == 'Andy');
    assert.isTrue(self_find_result[1] == 'Chen');
    assert.isTrue(self_find_result[2] == 'amazingandyyy@gmail.com');
    assert.isTrue(self_find_result[3] == false);
  });

  it('fail to find one unregistered person', async function() {
    try{
      let find_none_result = await eventInstance.search.call(stranger);
    }catch(e){
      assert.isTrue(!e == false);
    }
  });

  it('stranger should fail checkin one registered user', async function() {
    let reg_result = await eventInstance.register(
      'Andy', 'Chen', 'amazingandyyy@gmail.com',
      {
        value: web3.toWei(0.001, "ether"),
        from: buyer
      }
    );
    try{
      let public_checkin = await eventInstance.checkin.call(buyer, {
        from: buyer
      });
    }catch(e){
      assert.isTrue(!e == false);
      let holder_find_result = await eventInstance.search.call(buyer);
      assert.isTrue(holder_find_result[3] == false);
    }
  });

  it('holder should can checkin one registered user', async function() {
    let reg_result = await eventInstance.register(
      'Andy', 'Chen', 'amazingandyyy@gmail.com',
      {
        value: web3.toWei(0.001, "ether"),
        from: buyer
      }
    );

    let holder_checkin = await eventInstance.checkin.call(buyer);

    let holder_find_result = await eventInstance.search.call(buyer);
  });

  it('holder fail to checkin one unregistered person', async function() {
    try{
      let find_none_result = await eventInstance.checkin.call(stranger);
    }catch(e){
      assert.isTrue(!e == false);
    }
  });

});

// log
function log(msg){
  if(msg.message) return console.error('❌ ', msg);
  console.log(
    new Date().toLocaleTimeString([], {
      hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    }), msg);
}
