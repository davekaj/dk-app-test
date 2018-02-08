

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
import ValidatorList from '../component/ValidatorList';
import Dropdown from '../component/Dropdown';
import Graphs from '../component/Graphs';
import InfoBar from '../component/InfoBar';
import Header from '../component/Header';
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

  handleNetworkDropdown(e) {
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
          <Header
            blockchainInfoHeaderProp={this.state.blockchainInfo}>
          </Header>
          <InfoBar
            infoBarValidatorListProp={this.state.validatorListToPass}
            blockchainInfoInfobarProp={this.state.blockchainInfo} >
          </InfoBar>
          <Graphs
            blockchainGraphsProp={this.state.blockchainInfo}>
          </Graphs>
          <Dropdown
            currentNetworkDropdownProp={this.state.currentNetworkView}
            blockchainInfoDropdownProp={this.state.blockchainInfo}
            networkHandler={this.handleNetworkDropdown}>
          </Dropdown>
          <ValidatorList
            validatorListProp={this.state.validatorListToPass}
            currentNetworkValidatorListProp={this.state.currentNetworkView}
            blockchainInfoValidatorList={this.state.blockchainInfo}>
          </ValidatorList>
        </div>
      </div>
    );
  }
}

export default App;
