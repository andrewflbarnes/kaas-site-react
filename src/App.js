import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { func } from 'prop-types'
import './App.css';
import { bindActionCreators } from 'redux';
import Navigation from './components/Navigation';
import Seeding from './pages/Seeding';
import Racing from './pages/Racing'
import Home from './pages/Home'
import * as actions from './state/kaas/action_creators'

const propTypes = {
  getData: func.isRequired
}

export class RawApp extends React.PureComponent {
  componentDidMount() {
    const { getData } = this.props
    getData()
  }

  render() {
    return (
      <div className="App px-0" >
        <Router>
          <Navigation />
          <div className="col-lg-10 offset-lg-1 px-0">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/seeding" component={Seeding} />
              <Route path="/racing" component={Racing} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

RawApp.propTypes = propTypes

const mapDispatchTooProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const App = connect(null, mapDispatchTooProps)(RawApp)

export default App