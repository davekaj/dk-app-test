import React, { Component } from 'react';
import HeadStyle from './Header.css';


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
        <div>
          <div className="row col-xs-12">
            <div className="col-xs-3 header-left block-height">Block Height: {this.props.blockchainInfoHeaderProp.blockHeight} </div>
            <div className="col-xs-3 header-right atom-price">Atom Price: $ {this.state.atomPrice}</div>
          </div>
          <div className="row">
          <div className="col-xs-3 block-tx">Transactions Graph</div>
          <div className="col-xs-3 header-right block-time">Block Time</div>
          </div>
        </div>
      );
    }
  }

  export default Header;