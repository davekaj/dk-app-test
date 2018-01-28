

//http://gaia-2-node0.testnets.interblock.io:46657/
//http://gaia-1-node0.testnets.interblock.io:46657/

//nah lets do mongo, beacuse i have done it. this way im only adding redux, and docker
//probably digital ocean or aws or firebase to host 
//react and reduc
//and a docket image so it will run on linux instance on digtal ocean 
//need to do TEST DRIVE DEVELOPMENT!!
// i want to have a test DB
//should be a completely different firebase project
// i want to have snapshots of each DB stored in case of file corruption
// although i could get it from a validator block but w/e
// i can specific authentication of who can edit and update DB
//seems i cna do right insid of the web app
//99% sure i can just make a new key , seperate, if needed. 


import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      validatorList: [], //props to infobar, validator list
      blockchainInfo: {}, //props to all
      currentNetworkView: '', //props to dropdown list, validator list
    }

    this.getGaiaInfo = this.getGaiaInfo.bind(this);

  }


  //******************************************************************* */
  //app functions 

  async getGaiaInfo() {
    let myServerResponse = await axios.get('http://localhost:8080/getValidators')
    let arrayValidators = myServerResponse.data[0];
    this.setState({
      validatorList: arrayValidators
    })
  }


  //******************************************************************* */
  //lifecycle functions
  componentWillMount() {
    this.getGaiaInfo();
  }


  render() {
    return (
      <div className="App container">
        <div>
          <Header blockchainInfoHeaderProp={this.state.blockchainInfo}></Header>
          <InfoBar infoBarValidatorListProp={this.state.validatorList} blockchainInfoInfobarProp={this.state.blockchainInfo} ></InfoBar>
          <Graphs blockchainGraphsProp={this.state.blockchainInfo}></Graphs>
          <Dropdown currentNetworkDropdownProp={this.state.currentNetworkView} blockchainInfoDropdownProp={this.state.blockchainInfo} ></Dropdown>
          <ValidatorList validatorListProp={this.state.validatorList} currentNetworkValidatorListProp={this.state.currentNetworkView} blockchainInfoValidatorList={this.state.blockchainInfo}></ValidatorList>
        </div>
      </div>
    );
  }



}






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
          <span className="col-xs-2">blockHeight</span>
          <span className="App-title col-xs-8">atomstats</span>
          <span className="col-xs-2">atomPrice</span>
        </div>

      </div>
    );
  }
}

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
    return (
      <div className="Header">
        This is infobar
      </div>
    );
  }
}

class Graphs extends Component {
  constructor() {
    super();
    this.state = {
      graphs: {},
    }
  }

  render() {
    return (
      <div className="Graphs">
        This is graphs, which will be hidden for now
      </div>
    );
  }
}

class Dropdown extends Component {
  constructor() {
    super();
    this.state = {}

    //network view passed down because state should be shared with ValidatorListComponent

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
    return (
      <div className="Header">
        This is Dropdown
        <h2> Below is a list of current validators for the gaia2 network</h2>
      </div>
    );
  }
}

class ValidatorList extends Component {
  constructor() {
    super();
    this.state = {}
  }

  // this.getGaiaInfo = this.getGaiaInfo.bind(this);


  //******************************************************************* */
  //app functions 



  //******************************************************************* */
  //lifecycle functions
  //  componentWillMount() {
  // }

  render() {
    let validatorListInComponent = this.props.validatorListProp;

    // Now I have an array of objects
    const gaia2validators = Object.values(validatorListInComponent)

    const mapTable = gaia2validators.map((oneValidator, i) => {

      //now i have an array of the values of a single validator. the three values are date, atoms, and public key
      let validatorValues = Object.values(gaia2validators[i]);

      //date conversions
      const dateRecorded = new Date(validatorValues[1])
      const stringDateRecorded = dateRecorded.toDateString()
      const daysOnline = ((Date.now() - dateRecorded) / 1000 / 60 / 60 / 24).toFixed(2)

      return (
        <tr>
          <th>{validatorValues[2]}</th>
          <th>{stringDateRecorded}</th>
          <th>{daysOnline}</th>
          <th>{validatorValues[0]}</th>
        </tr>
      )
    })

    return (
      <div id="gaia2validators">
        <table>
          <tbody>
            <tr>
              <th>Validator Public Key</th>
              <th>1st date recorded</th>
              <th>Days Consecutively online</th>
              <th>Atoms staked</th>
            </tr>
            {mapTable}
          </tbody>
        </table>
      </div>
    );
  }





}


export default App;
