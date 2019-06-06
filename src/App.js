import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import RegionalScores from './RegionalScores';
import Navigation from './Navigation';
import Racing from './Racing'
import Home from './Home'
import { getData } from './common/action_creators'
import { bindActionCreators } from 'redux';

// TODO function / PureComponent
export class RawApp extends React.Component {
  constructor(props) {
    super(props)
  }

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
              <Route path="/seeding" component={RegionalScores} />
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