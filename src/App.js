import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Nav from './components/Nav';
import Favorites from './components/Favories';
import Details from './components/Details';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </div>
    );
  }
}

export default App;
