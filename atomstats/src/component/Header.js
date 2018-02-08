import React, { Component } from 'react';

class Header extends Component {
    constructor() {
      super();
      this.state = {
        atomPrice: [],
      }
  
      this.getAtomPrice = this.getAtomPrice.bind(this);
  
    }
    //******************************************************************* */
    //app functions 
  
    async getAtomPrice() {
      // let atomCMCPrice = await axios.get('https://api.coinmarketcap.com/v1/ticker/atoms/')
      // let priceUSD = atomCMCPrice.data[0].price_usd;
      // let priceBTC = atomCMCPrice.data[0].price_usd;
  
      let unknownPrice = ['????']
      this.setState({
        atomPrice: unknownPrice
      })
    }
  
    //******************************************************************* */
    //lifecycle functions
    componentWillMount() {
      this.getAtomPrice();
    }
  
    render() {
      return (
        <div className="Header row">
          <div className="App-header col-xs-12">
            <div className="col-xs-3 header-left">Block Height: {this.props.blockchainInfoHeaderProp.blockHeight} </div>
            <div className="App-title col-xs-6 header-middle">atomstats</div>
            <div className="col-xs-3 header-right">Atom Price: $ {this.state.atomPrice}</div>
          </div>
  
        </div>
      );
    }
  }

  export default Header;