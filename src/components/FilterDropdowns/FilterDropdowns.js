import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { func, arrayOf } from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import { bindActionCreators } from 'redux'
import * as actions from '../../state/filters/action_creators'
import * as kaasSelectors from '../../selectors/kaas'
import { season, stateActiveFilters } from '../../types'

const propTypes = {
  updateNextFilter: func.isRequired,
  seasons: arrayOf(season).isRequired,
  filters: stateActiveFilters.isRequired
}

export class RawFilterDropdowns extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(type, value) {
    const { updateNextFilter } = this.props

    updateNextFilter(type, value)
  }

  renderDropdown(type, elements) {
    if (elements.length < 1) {
      return ''
    }

    const { filters } = this.props

    const allText = `All ${type}s`
    const current = filters[type] || allText

    return (
      <Dropdown
        key={type}
        drop="left"
        onSelect={eventKey => this.handleSelect(type, eventKey)}
      >
        <Dropdown.Toggle
          size='sm'
          variant='primary'
        >
          {current}
        </Dropdown.Toggle>
        <Dropdown.Menu
          className='bg-dark'
        >
          <Dropdown.Header
            className='text-primary'
          >
            {type}
          </Dropdown.Header>
          <Dropdown.Divider />
          <Dropdown.Item
            variant='dark'
            className='text-light'
            key={allText}
            eventKey=""
          >
            {allText}
          </Dropdown.Item>
          {elements.map(e =>
            <Dropdown.Item
              variant='dark'
              className='text-light'
              key={e.name}
              eventKey={e.name}
            >
              {e.name}
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  render() {
    const { seasons } = this.props

    return (
      <div className="d-flex justify-content-center">
        {/* {this.renderDropdown("organisation", organisations)} */}
        {/* {this.renderDropdown("competition", competitions)} */}
        {this.renderDropdown("season", seasons)}
      </div>
    )
  }
}

RawFilterDropdowns.propTypes = propTypes

const mapStateToProps = createStructuredSelector({
  seasons: kaasSelectors.getSeasons,
  // organisations: kaasSelectors.getOrganisations,
  // competitions: kaasSelectors.getCompetitions,
  filters: kaasSelectors.getActiveFilters
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const FilterDropdowns = connect(mapStateToProps, mapDispatchToProps)(RawFilterDropdowns)

export default FilterDropdowns