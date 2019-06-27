import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar'
import FilterDisplay from '../FilterDisplay'
import FilterOptionsModal from '../FilterOptionsModal'
import ErrorBar from '../ErrorBar'
import * as actions from '../../state/filters/action_creators'
import StatusBar from '../StatusBar/SttatusBar';

export class RawNavigation extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      showFilters: false
    }

    this.toggleShowFilters = this.toggleShowFilters.bind(this)
    this.handleFilterActivated = this.handleFilterActivated.bind(this)
    this.handleHide = this.handleHide.bind(this)
  }

  toggleShowFilters() {
    const { showFilters } = this.state
    this.setState({
      showFilters: !showFilters
    })
  }

  handleFilterActivated() {
    this.setState({
      showFilters: false
    })
  }

  handleHide() {
    const { cancelFilters } = this.props

    this.toggleShowFilters()
    cancelFilters()
  }

  render() {
    const { handleHide, toggleShowFilters, handleFilterActivated, state, props } = this
    const { showFilters } = state
    const { status, activeFilters } = props

    return (
      <>
        <NavigationBar toggleShowFilters={toggleShowFilters}/>
        
        <StatusBar {...status} />

        <FilterDisplay filters={activeFilters}/>

        <FilterOptionsModal
          show={showFilters}
          onHide={handleHide}
          onFilterActivated={handleFilterActivated}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  const { status, filters: { activeFilters } } = state

  return {
    activeFilters,
    status
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const Navigation = connect(mapStateToProps, mapDispatchToProps)(RawNavigation);

export default Navigation