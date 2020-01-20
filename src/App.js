import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Weather from './Weather';
import Forecast from './Forecast';
import LocationList from './Locations';
import Search from './Search';

class App extends React.Component {
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={Weather} />
          <Route path="/Forecast" component={Forecast} />
          <Route path="/Locations" component={LocationList} />
          <Route path="/Search" component={Search} />          
        </div>
      </Router>     

    );
  }
}

export default App;