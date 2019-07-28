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
import api from './api'
import * as kaasActions from './store/state/kaas/action_creators'
import * as filterActions from './store/state/filters/action_creators'
import * as statusActions from './store/state/status/action_creators'
import * as selectors from './selectors/kaas'
import constants from './common/constants';

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

async function fetchAndDispatch(dispatch, endpoint, next) {
  const res = await endpoint()
  try {
    dispatch(next(res))
  } catch (err) {
    dispatch(statusActions.setFetchError(endpoint.name, err.message))
  }
}

const DUMMY = { name: constants.FILTER_NONE }

function getData() {
  return async (dispatch, getState) => {
    dispatch(statusActions.resetLoading())
    dispatch(statusActions.setLoading())
    const p1 = fetchAndDispatch(dispatch, api.getOrganisations, kaasActions.setOrganisations)
    const p2 = fetchAndDispatch(dispatch, api.getCompetitions, kaasActions.setCompetitions)
    const p3 = fetchAndDispatch(dispatch, api.getSeasons, kaasActions.setSeasons)
    const p4 = fetchAndDispatch(dispatch, api.getLeagues, kaasActions.setLeagues)
    const p5 = fetchAndDispatch(dispatch, api.getDivisions, kaasActions.setDivisions)
    const p6 = fetchAndDispatch(dispatch, api.getRegionals, kaasActions.setRegionals)
    const p7 = fetchAndDispatch(dispatch, api.getRegionalScores, kaasActions.setScores)
    await Promise.all([p1, p2, p3, p4, p5, p6, p7])
    dispatch(statusActions.setLoaded())
    let state = getState()
    dispatch(filterActions.updateOrganisationFilter(selectors.getOrganisations(state)[0].name))
    state = getState()
    const competition = selectors.getFilteredCompetitions(state)[0] || DUMMY
    dispatch(filterActions.updateCompetitionFilter(competition.name))
    state = getState()
    const season = selectors.getFilteredSeasons(state)[0] || DUMMY
    dispatch(filterActions.updateSeasonFilter(season.name))
  }
}

const mapDispatchTooProps = dispatch => {
  return bindActionCreators({ getData }, dispatch)
}

const App = connect(null, mapDispatchTooProps)(RawApp)

export default App