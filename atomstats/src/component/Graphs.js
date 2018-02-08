import React, { Component } from 'react';

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

  export default Graphs;