import React from 'react';
import { connect } from 'react-redux';
import Eth from 'ethjs';

let initialState = {
  event: {
    name: '',
    location: '',
    date: '',
    ticketNum: 0,
    ticketPrice : 0
  },
  tx: ''
}
class Create extends React.Component {
  
  constructor(props) {
    super();
    this.state = initialState;
  }
  componentDidMount(){

  }
  createEvent(e) {
    e.preventDefault();
    const { eth } = this.props;
    console.log(this.state);
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
  }
  render() {
    return (
      <div>
      <div className="container" style={{'marginTop': '50px', 'marginBottom': '50px'}}>
      <div className="row">
        <div className="col col-xs-12 col-md-8" style={{'margin': 'auto'}}>
            <form onSubmit={this.createEvent.bind(this)}>
              <div className='form-group'>
                <h3 style={styles.h3}>{`Create an Event (Admin Only)`.toUpperCase()}</h3>
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
      </div>
    )
  }
}


export default connect(({ eth }) => ({ eth }), null)(Create)

const styles = {
  'h3': {
    'fontSize': 20,
    'letterSpacing': '1px'
  }
}

// AMAZINGANDYYYCrowdsale: 0x4089e011d607f49ce84f63c8b488af1b822fbafb
// -----> VentureCoin(VCN) Address 0x534f0e10ecbafcee0b05311a13d922be931e1281
// -----> startTime:   1511039437
// -----> endTime:     1511903437
// -----> rate:        488
// -----> wallet:      0xcff8067f05961675277825ab785d5ce830bb485e
// -----> cappedInWei: 125000000000000000000000
