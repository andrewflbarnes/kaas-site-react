import React from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import RegionalScores from './RegionalScores';
import Navigation from './Navigation';
import Home from './Home'
import store from './store'

export default class App extends React.Component {
  render() {
    return (
      <div className="App px-0" >
        <Provider store={store}>
          <Router>
            <Navigation />
            <div className="App col-lg-10 offset-lg-1 px-0">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/seeding" component={RegionalScores} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    )
  }
}
