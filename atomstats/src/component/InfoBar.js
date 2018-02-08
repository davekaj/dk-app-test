import React, { Component } from 'react';

class InfoBar extends Component {
    constructor() {
      super();
      this.state = {}
  
  
      //here we use props to play around with the state from above, blockchainInfo
  
      // this.getGaiaInfo = this.getGaiaInfo.bind(this);
  
  
    }
    //******************************************************************* */
    //app functions 
  
    // async getGaiaInfo() {
    //   let myServerResponse = await axios.get('http://localhost:8080/getValidators')
    //   let arrayValidators = myServerResponse.data[0];
    //   this.setState({
    //     validatorList: arrayValidators
    //   })
    // }
  
    //******************************************************************* */
    //lifecycle functions
    // componentWillMount() {
    //   this.getGaiaInfo();
    // }
  
    render() {
      let numberOfNodes = (this.props.infoBarValidatorListProp)
      let numberOfNodesLength = Object.keys(numberOfNodes).length
      return (
        <div className="infoBar row">
          <div className="col-xs-12">
            <span className="col-xs-3">Gas Price: n/a</span>
            <span className="col-xs-3">Block % Full: n/a</span>
            <span className="col-xs-3">Block Time:  </span>
            <span className="col-xs-3">Number of Nodes: {numberOfNodesLength}   </span>
          </div>
        </div>
      );
    }
  }

  export default InfoBar;