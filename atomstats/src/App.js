

//http://gaia-2-node0.testnets.interblock.io:46657/
//http://gaia-1-node0.testnets.interblock.io:46657/

//nah lets do mongo, beacuse i have done it. this way im only adding redux, and docker
//probably digital ocean or aws or firebase to host 
//react and reduc
//and a docket image so it will run on linux instance on digtal ocean 
//need to do TEST DRIVE DEVELOPMENT!!

import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      response: ["hi"]
    }

    this.getGaiaInfo = this.getGaiaInfo.bind(this);

  }

  componentWillMount() {
    this.getGaiaInfo();
  }


  async getGaiaInfo() {
    let myServerResponse = await axios.get('http://localhost:8080/getValidators')
    let arrayValidators = myServerResponse.data[0];
    this.setState({
      response: arrayValidators
    })
  }

  render() {
    
    // Now I have an array of objects
    const gaia2validators = Object.values(this.state.response)
    
    const mapTable = gaia2validators.map((oneValidator, i) => {

      //now i have an array of the values of a single validator. the three values are date, atoms, and public key
      let validatorValues = Object.values(gaia2validators[i]);

      //date conversions
      const dateRecorded = new Date(validatorValues[1])
      const stringDateRecorded = dateRecorded.toDateString()
      const daysOnline = ((Date.now() - dateRecorded)/1000/60/60/24).toFixed(2)

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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to atomstats</h1>
        </header>
        <p className="App-intro">
          Below is a list of current validators for the gaia2 network
        </p>
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
      </div>
    );
  }
}

export default App;
