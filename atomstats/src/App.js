

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
      validatorListToPass: [], //this will be the only one passed down, while the other ones get stored on the front end and can be passed back and forth. this is done so that the server doesnt have to constantly keep serving up the different values, so trying to limit the queries to it 
      validatorListGaia2: [], //props to infobar, validator list
      validatorListGaia1: [],
      validatorListMainnet: [],
      validatorListTestnet: [],
      validatorListEthermint: [],
      blockchainInfo: {
        blockHeight: 0
      },
      currentNetworkView: 'getGaia2Validators', //props to dropdown list, validator list
    }

    this.getNetworkInfo = this.getNetworkInfo.bind(this);
    this.handleNetworkDropdown = this.handleNetworkDropdown.bind(this);


  }


  //******************************************************************* */
  //app functions 

  async getNetworkInfo(network) {
    let myServerResponse = await axios.get(`http://localhost:8080/${network}`)
    let arrayValidators = myServerResponse.data[0];

    switch (network) {
      case 'getGaia2Validators':
        this.setState({
          validatorListToPass: arrayValidators,
          validatorListGaia2: arrayValidators

        })
        break
      case 'getGaia1Validators':
        this.setState({
          validatorListToPass: arrayValidators,
          validatorListGaia1: arrayValidators,
        })
    }
  }

  async getBlockHeight(networkURL) {
    let consensusState = await axios.get(networkURL)
    let blockHeight = consensusState.data.result.round_state.Height
    this.setState({
      blockchainInfo: { blockHeight: blockHeight },
    })
  }

  handleNetworkDropdown(e){
    e.preventDefault()
    let chosenNetwork = e.target.value
    console.log(chosenNetwork)
    this.setState({
      currentNetworkView: chosenNetwork
    })
  }


  //******************************************************************* */
  //lifecycle functions
  componentWillMount() {
    let blockHeightURL
    this.getNetworkInfo(this.state.currentNetworkView)

    switch (this.state.currentNetworkView) {
      case 'getGaia2Validators':
        blockHeightURL = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state'
        break
      case 'getGaia1Validators':
        blockHeightURL = 'http://gaia-1-node0.testnets.interblock.io:46657/dump_consensus_state'
    }

    this.getBlockHeight(blockHeightURL)
  }

  //this is infinite loop right now :()

  // componentDidUpdate(){
  //   let blockHeightURL
  //   this.getNetworkInfo(this.state.currentNetworkView)

  //   switch (this.state.currentNetworkView) {
  //     case 'getGaia2Validators':
  //       blockHeightURL = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state'
  //       break
  //     case 'getGaia1Validators':
  //       blockHeightURL = 'http://gaia-1-node0.testnets.interblock.io:46657/dump_consensus_state'
  //   }

  //   this.getBlockHeight(blockHeightURL)
  // }


  render() {
    return (
      <div className="App container-fluid">
        <div>
          <Header blockchainInfoHeaderProp={this.state.blockchainInfo}></Header>
          <InfoBar infoBarValidatorListProp={this.state.validatorListToPass} blockchainInfoInfobarProp={this.state.blockchainInfo} ></InfoBar>
          <Graphs blockchainGraphsProp={this.state.blockchainInfo}></Graphs>
          <Dropdown currentNetworkDropdownProp={this.state.currentNetworkView} blockchainInfoDropdownProp={this.state.blockchainInfo} networkHandler={this.handleNetworkDropdown}></Dropdown>
          <ValidatorList validatorListProp={this.state.validatorListToPass} currentNetworkValidatorListProp={this.state.currentNetworkView} blockchainInfoValidatorList={this.state.blockchainInfo}></ValidatorList>
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
          <div className="col-xs-3 header-left">Block Height: {this.props.blockchainInfoHeaderProp.blockHeight} </div>
          <div className="App-title col-xs-6 header-middle">atomstats</div>
          <div className="col-xs-3 header-right">Atom Price: $ {this.state.atomPrice}</div>
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
      <div className="dropdown row">
        <div className="col-xs-12">
          <select className="col-xs-3 networkDropdown" onClick={(e)=> {this.props.networkHandler(e)}}>
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
    const networkValidators = Object.values(validatorListInComponent)

    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }

    networkValidators.sort(dynamicSort('-atomCount'))

    const mapTable = networkValidators.map((oneValidator, i) => {

      //now i have an array of the values of a single validator. the three values are date, atoms, and public key
      let validatorValues = Object.values(networkValidators[i]);

      //date conversions
      const dateRecorded = new Date(validatorValues[1])
      const stringDateRecorded = dateRecorded.toDateString()
      const daysOnline = ((Date.now() - dateRecorded) / 1000 / 60 / 60 / 24).toFixed(2)

      return (
        <tr className="table-values">
          <th>{i}</th>
          <th>unknown</th>
          <th>{validatorValues[2]}</th>
          <th>unknown</th>
          <th>unknown</th>
          <th>{stringDateRecorded}</th>
          <th>{daysOnline}</th>
          <th>{validatorValues[0]}</th>
          <th>0</th>
          <th>unknown</th>
          <th id='removeBorderRight'>0 %</th>
        </tr>
      )
    })

    return (
      <div id="networkValidators">
        <table>
          <tbody>
            <tr>
              <th>Rank</th>
              <th>Validator Name</th>
              <th>Validator Public Key</th>
              <th>Validator Website</th>
              <th># of Sentry Nodes</th>
              <th>1st date recorded</th>
              <th>Days Consecutively online</th>
              <th>Atoms Self bonded</th>
              <th>Atoms Delegated</th>
              <th>% Atoms of whole network</th>
              <th id='removeBorderRight'>Delegate Commission</th>
            </tr>
            {mapTable}
          </tbody>
        </table>
      </div>
    );
  }





}


export default App;
