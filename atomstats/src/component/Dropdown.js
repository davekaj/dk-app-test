import React, { Component } from 'react';
import DropStyle from './Dropdown.css';

const Dropdown = (props) => {
  return (
    <div className="dropdown row">
      <div className="col-xs-12">
        <select className="col-xs-3 networkDropdown" onClick={(e)=> {props.networkHandler(e)}}>
          <option value="getGaia2Validators">Gaia2</option>
          <option value="getGaia1Validators">Gaia1</option>
          <option value="getMainnetValidators">Mainnet</option>
          <option value="getTestnetValidators">Testnet</option>
          <option value="getEthermintValidators">Ethermint</option>
        </select>
        <span className="col-xs-9">Below is a list of current validators on the network </span>
      </div>
    </div>
  );
}
 
export default Dropdown;

      //network view passed down because state should be shared with ValidatorListComponent
  
      // this.getGaiaInfo = this.getGaiaInfo.bind(this);
  
  
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
