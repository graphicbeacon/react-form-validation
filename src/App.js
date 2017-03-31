import React, { Component } from 'react';
import FormContainer from './components/FormContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <FormContainer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
