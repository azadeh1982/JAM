import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Jobs from './components/Jobs';
import NavBar from './components/NavBar';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path = "/" component={NavBar}/>
          <Route exact path = "/login" component={Login}/>
          <Route exact path = "/register" component={Register}/>  
          <Route exact path = "/jobs" component={Jobs} />     
        </div>
      </Router>
    );
  }
}

export default App;
