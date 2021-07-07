import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { func, arrayOf, bool } from 'prop-types'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/state/filters/action_creators'
import * as kaasSelectors from '../../selectors/kaas'
import { organisation, competition, season, stateActiveFilters } from '../../types'
import constants from '../../common/constants'

const propTypes = {
  full: bool,
  updateOrganisationFilterCascade: func.isRequired,
  updateCompetitionFilterCascade: func.isRequired,
  updateSeasonFilter: func.isRequired,
  organisations: arrayOf(organisation).isRequired,
  competitions: arrayOf(competition).isRequired,
  seasons: arrayOf(season).isRequired,
  filters: stateActiveFilters.isRequired
}

const defaultProps = {
  full: false
}

export class RawFilterDropdowns extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(type, value) {
    const { updateOrganisationFilterCascade, updateCompetitionFilterCascade, updateSeasonFilter } = this.props

    switch (type) {
      case 'organisation':
        updateOrganisationFilterCascade(value)
        break;
      case 'competition':
        updateCompetitionFilterCascade(value)
        break;
      case 'season':
        updateSeasonFilter(value)
        break;
      default:
        // No actions
    }
  }

  renderDropdown(type, elements) {
    if (elements.length < 1) {
      return (
        <Button
          size='sm'
          className='mx-1'
        >
          NONE
        </Button>
      )
    }

    const { filters } = this.props

    const allText = `All ${type}s`
    const allKey = constants.FILTER_ALL
    const current = filters[type]
    const currentText = current === constants.FILTER_ALL ? allText : current

    return (
      <Dropdown
        alignRight
        key={type}
        className='mx-1'
        onSelect={eventKey => this.handleSelect(type, eventKey)}
      >
        <Dropdown.Toggle
          size='sm'
          variant='primary'
        >
          {currentText}
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
            className='text-light'
            key={allKey}
            eventKey={allKey}
          >
            {allText}
          </Dropdown.Item>
          {elements.map(e =>
            <Dropdown.Item
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

  renderFullDropdown() {
    const { organisations, competitions } = this.props
    return (
      <>
        {this.renderDropdown("organisation", organisations)}
        {this.renderDropdown("competition", competitions)}
      </>
    )
  }

  render() {
    const { seasons, full } = this.props

    return (
      <div className="d-flex justify-content-center">
        {full &&
          this.renderFullDropdown()
        }
        {this.renderDropdown("season", seasons)}
      </div>
    )
  }
}

RawFilterDropdowns.propTypes = propTypes
RawFilterDropdowns.defaultProps = defaultProps

const mapStateToProps = createStructuredSelector({
  seasons: kaasSelectors.getFilteredSeasons,
  organisations: kaasSelectors.getOrganisations,
  competitions: kaasSelectors.getFilteredCompetitions,
  filters: kaasSelectors.getActiveFilters
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const FilterDropdowns = connect(mapStateToProps, mapDispatchToProps)(RawFilterDropdowns)

export default FilterDropdowns