

//http://gaia-2-node0.testnets.interblock.io:46657/
//http://gaia-1-node0.testnets.interblock.io:46657/

//nah lets do mongo, beacuse i have done it. this way im only adding redux, and docker
//probably digital ocean or aws or firebase to host 
//react and reduc
//and a docket image so it will run on linux instance on digtal ocean 

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor(){
    super();
    this.state = {
      response: ["hi"]
    }

    this.getGaiaInfo = this.getGaiaInfo.bind(this);

  }

  async getGaiaInfo() {
    let url = 'http://gaia-2-node0.testnets.interblock.io:46657/dump_consensus_state';
    let myServerResponse = await axios.get('http://localhost:8080/dumpConsensusState')

    let copyState = this.state.response;
    // console.log(myServerResponse);
    let arrayValidators = myServerResponse.data.validators;
    console.log(arrayValidators);
    this.setState({
      response: arrayValidators
    })

    console.log(this.state.response);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button className='test' id='test' onClick={()=>{this.getGaiaInfo()}}>Get gaia info</button>
      </div>
    );
  }
}

export default App;
