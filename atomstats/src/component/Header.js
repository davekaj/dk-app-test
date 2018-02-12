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

      let numberOfNodes = (this.props.infoBarValidatorListProp)
      let numberOfNodesLength = Object.keys(numberOfNodes).length

      return (
        <div>
          <div className="row col-xs-12">
            <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 header-left block-height">Block Height: <br/>{this.props.blockchainInfoHeaderProp.blockHeight} </div>
            <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 header-right atom-price">Atom Price: <br/>${this.state.atomPrice}</div>
            <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 header-right atom-price">Number of Nodes:<br/>{numberOfNodesLength}</div>
          </div>
          <div className="row">
          <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 block-tx">Transactions Graph</div>
          <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 header-right block-time">Block Time</div>
          <div className="col-md-3 col-lg-3 col-xl-3 col-xs-12 header-right block-time">Block Percentage</div>
          </div>
        </div>
      );
    }
  }

  export default Header;