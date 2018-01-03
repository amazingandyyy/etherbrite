pragma solidity ^0.4.4;

contract Event {
  address public holder;
  string  public name;
  string  public location;
  string  public date;
  uint    public ticketNum = 0;
  uint    public ticketPrice;

  event ContractCreated();
  event NewRegistration(address buyer, string first, string last, string email, bool checkedin);
  event CheckedIn(address buyer, bool checkedin);
  
  struct Attendee {
    string    first;
    string    last;
    string    email;
    bool      checkedin;
  }

  mapping(address => Attendee) private Attendees;

  modifier isHolder() {
    require(msg.sender == holder);
    _;
  }

  function Event(string _name, string _location,string _date, uint _ticketNum, uint _ticketPrice) public payable {
    // constructor
    require(bytes(_name).length != 0);
    require(bytes(_location).length != 0);
    require(bytes(_date).length != 0);
    require(_ticketNum != 0);
    require(_ticketPrice >= 0);
    
    holder = msg.sender;
    name = _name;
    location = _location;
    date = _date;
    ticketNum = _ticketNum;
    ticketPrice = _ticketPrice;

    ContractCreated();
  }

  function register(string _first, string _last, string _email) public payable {
    // constructor
    require(ticketNum - 1 >= 0);
    require(bytes(_first).length > 0);
    require(bytes(_last).length > 0);
    require(bytes(_email).length > 0);
    require(msg.value >= ticketPrice);

    Attendee memory currentAttendee;
    currentAttendee.first = _first;
    currentAttendee.last = _last;
    currentAttendee.email = _email;
    currentAttendee.checkedin = false;
    
    ticketNum = ticketNum - 1;
    Attendees[msg.sender] = currentAttendee;

    NewRegistration(msg.sender, Attendees[msg.sender].first, Attendees[msg.sender].last, Attendees[msg.sender].email, Attendees[msg.sender].checkedin);
  }

  // search with address
  function search(address _buyer)
    public 
    returns (string, string, string, bool)
  {
    require(bytes(Attendees[_buyer].email).length > 0);
    if (msg.sender == _buyer) {
      return (Attendees[_buyer].first, Attendees[_buyer].last, Attendees[_buyer].email, Attendees[_buyer].checkedin);
    }
    if (msg.sender == holder) {
      return (Attendees[_buyer].first, Attendees[_buyer].last, Attendees[_buyer].email, Attendees[_buyer].checkedin);
    }
    return ("Private", "Private", "Private", Attendees[_buyer].checkedin);
  }

  function checkin(address _buyer) isHolder public returns (string, string, string, bool) {
    require(bytes(Attendees[_buyer].email).length > 0);
    Attendees[_buyer].checkedin = true;
    CheckedIn(_buyer, Attendees[_buyer].checkedin);
    return (Attendees[_buyer].first, Attendees[_buyer].last, Attendees[_buyer].email, Attendees[_buyer].checkedin);
  }
  
}
