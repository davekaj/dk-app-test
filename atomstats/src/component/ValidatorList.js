import React, { Component } from 'react';
import List from './ValidatorList.css';

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
        <div className="main" id="networkValidators">
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

export default ValidatorList;