import React from 'react';
import { connect } from 'react-redux';
import { eventContract } from 'etherbrite-connect';

// import 'react-notifications/lib/notifications.css';
// import {NotificationContainer, NotificationManager} from 'react-notifications';

let initialState = {
  event: {
    name: 'Testing Event Name',
    location: 'Testing Event Location',
    date: new Date().toLocaleDateString([], {
      day: '2-digit', month: '2-digit', year: 'numeric', 
    }).split('/').join('-').toString(),
    ticketNum: 10,
    ticketPrice : 0.001
  },
  tx: ''
};

class Create extends React.Component {
  
  constructor(props) {
    super();
    this.state = initialState;
  }
  componentDidMount(){
    // test(this.props.web3.eth.currentProvider);
    // NotificationManager.info('Info message');
  }
  createEventNow(e) {
    e.preventDefault();
    const provider = this.props.web3.eth.currentProvider;
    let { name, location, date, ticketNum, ticketPrice } = this.state.event;
    const eventContractInst = new eventContract(provider);

    eventContractInst.createEvent(name, location, date, ticketNum, ticketPrice)
      .then(inst=>{
        if(inst.options.address) return console.log(`Deplyed Contract Address ${inst.options.address}`, inst);
      })
      .catch(e=> console.error(e));
  }
  render() {
    return (
      <div>
      <div className="container" style={{'marginTop': '50px', 'marginBottom': '50px'}}>
      <div className="row">
        <div className="col col-xs-12 col-md-8" style={{'margin': 'auto'}}>
            <form onSubmit={this.createEventNow.bind(this)}>
              <div className='form-group'>
                <h3 style={styles.h3}>{`Create an Event`.toUpperCase()}</h3>
                <label>Name</label>
                <input onChange={(event)=>this.setState({event:{...this.state.event, name: event.target.value}})} value={this.state.name} type="text" className="form-control" placeholder="Ex: Etherbrite Testing Event"/>
              </div>
              <div className='form-group'>
                <label>Location</label>
                <input onChange={(event)=>this.setState({event:{...this.state.event, location: event.target.value}})} value={this.state.location} type="text" className="form-control" placeholder="Ex: San Francisco"/>
              </div>
              <div className='form-group'>
                <label>Date</label>
                <input onChange={(event)=>this.setState({event:{...this.state.event, date: event.target.value}})} value={this.state.date} type="date" className="form-control" placeholder="Ex: Jan., 1, 2020"/>
              </div>
              <div className='form-group'>
                <label>Available Ticket Amount</label>
                <input onChange={(event)=>this.setState({event:{...this.state.event, ticketNum: event.target.value}})} value={this.state.ticketNum} min="0" step="1" type="number" className="form-control" placeholder="10"/>
              </div>
              <div className='form-group'>
                <label>Ticket Price (in ether)</label>
                <input onChange={(event)=>this.setState({event:{...this.state.event, ticketPrice: event.target.value}})} value={this.state.ticketPrice} step="0.001" type="number" className="form-control" placeholder="Price in ether, Ex: 0.01 ethers"/>
                {this.state.event.ticketPrice?<small>around ${Math.round(this.state.event.ticketPrice * 755.55 * 100)/100} USD</small>:''}
              </div>
              <button type="submit"  className="btn btn-primary">Preview and Create</button>
            </form>
        </div>
      </div>
      </div>
      {/* <NotificationContainer /> */}
      </div>
    )
  }
}


export default connect(({ web3 }) => {
  console.log(web3);
  return { web3 }
}, null)(Create)

const styles = {
  'h3': {
    'fontSize': 20,
    'letterSpacing': '1px'
  }
}

// const VCNCrowdSaleAddr = this.state.address; // <- need to be change
  // if (VCNCrowdSaleAddr) {
  //   eth.coinbase().then((coinbase) => {
  //     this.setState({
  //       coinbase
  //     })
  //     let num = this.state.etherAmount;
  //     if (num > 0){
  //       eth.sendTransaction({
  //         from: coinbase,
  //         to: VCNCrowdSaleAddr,
  //         value: Eth.toWei(num, "ether"),
  //         data: '0x'
  //       }).then(tx=>{
  //         this.setState({ tx })
  //       }).catch(console.error);
  //     }
  //   }).catch(console.error);
  // }
