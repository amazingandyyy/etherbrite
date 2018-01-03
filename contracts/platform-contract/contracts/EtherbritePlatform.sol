pragma solidity ^0.4.4;

contract EtherbritePlatform {
  string inventor;

  // struct Event {
  //   address   contractAddress;
  // }
  
  address[] public EventList;

  function EtherbritePlatform() {
    // constructor
    inventor = "Amazingandyyy";
  }

  function addEvent(address addr) {
    EventList.push(addr);
  }
}
