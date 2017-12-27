import React from 'react'
import { connect } from 'react-redux'
import Eth from 'ethjs'
let initialState = {
  address: '',
  abi: '',
  etherAmount: 0,
  coinbase: '',
  tx: ''
}
class Crowdsale extends React.Component {
  
  constructor(props) {
    super();
    this.state = initialState
  }
  componentDidMount(){
    // const { eth } = this.props;
    this.setState(initialState)
  }
  buyIn(event) {
    event.preventDefault();
    const { eth } = this.props;
    const VCNCrowdSaleAddr = this.state.address; // <- need to be change
    if (VCNCrowdSaleAddr) {
      eth.coinbase().then((coinbase) => {
        this.setState({
          coinbase
        })
        let num = this.state.etherAmount;
        if (num > 0){
          eth.sendTransaction({
            from: coinbase,
            to: VCNCrowdSaleAddr,
            value: Eth.toWei(num, "ether"),
            data: '0x'
          }).then(tx=>{
            this.setState({ tx })
          }).catch(console.error);
        }
      }).catch(console.error);
    }
  }
  render() {
    return (
      <div>
        {/* {!eth && <div className='alert alert-secondary' role='alert'>
      *important You need metamask or ethereum blockchain on localhost:8545
      </div>}
      {eth && <div className='alert alert-success' role='alert'>
        Connected to Ethereum
      </div>} */}
      <div className="container" style={{'marginTop': '50px'}}>
      <div className="row">
        <div className="col col-xs-12">
            <form onSubmit={this.buyIn.bind(this)}>
              <div className='form-group'>
                <h3 style={styles.h3}>{`Step 1`.toUpperCase()}</h3>
                <label>Crowdsale Address</label>
                <input onChange={(event)=>this.setState({address: event.target.value})} value={this.state.address} type="text" className="form-control" placeholder="Crowdsale Address"/>
              </div>
              <div style={{display: this.state.address?'block':'none'}}>
                <div className='form-group'>
                  <h3 style={styles.h3}>{`Step 2`.toUpperCase()}</h3>
                  <label>Token Amount:</label>
                  <br />
                  <input onChange={(event)=>this.setState({etherAmount: event.target.value})} value = {this.state.etherAmount} type='range' min='0' max={3} step='0.1' />
                  <br/>
                  {this.state.etherAmount} ethers = <b>{this.state.etherAmount*488}</b> Amazingandyyy(AMZNANDYYY)
                </div>
                <button type="submit" disabled={!this.state.address || !this.state.etherAmount} className="btn btn-primary">Buy Token</button>
                <div  style={{display: this.state.tx?'block':'none'}}>
                  <hr/>
                  <h3 style={styles.h3}>{`Step 3`.toUpperCase()}</h3>
                  <div className="alert alert-info" role="alert">
                    Congratulations! Your tx number is <a href={`https://rinkeby.etherscan.io/tx/`+this.state.tx} target='_blank' className="alert-link">{this.state.tx}</a>
                  </div>
                </div>
              </div>
            </form>
        </div>
      </div>
      </div>
      </div>
    )
  }
}


export default connect(({ eth }) => ({ eth }), null)(Crowdsale)

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
