import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation';
import RegionalScoresByLeagueAndClub from './pages/RegionalScoresByLeagueAndClub';
import RegionalScoresByLeague from './pages/RegionalScoresByLeague';
import Racing from './pages/Racing'
import Home from './pages/Home'
import { getData } from './state/kaas/action_creators'
import { bindActionCreators } from 'redux';

// TODO function / PureComponent
export class RawApp extends React.Component {
  componentDidMount() {
    this.props.getData()
  }

  render() {
    return (
      <div className="App px-0" >
        <Router>
          <Navigation />
          <div className="col-lg-10 offset-lg-1 px-0">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/seeding" component={RegionalScoresByLeague} />
              <Route path="/seeding2" component={RegionalScoresByLeagueAndClub} />
              <Route path="/racing" component={Racing} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

const mapDispatchTooProps = dispatch => {
  return bindActionCreators({getData}, dispatch)
}

const App = connect(null, mapDispatchTooProps)(RawApp)

export default App