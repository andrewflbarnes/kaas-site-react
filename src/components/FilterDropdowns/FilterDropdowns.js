import React from 'react'
import { connect } from 'react-redux'
import * as kaasSelectors from '../../selectors/kaas'
import { createStructuredSelector } from 'reselect'
import Dropdown from 'react-bootstrap/Dropdown'
import * as actions from '../../state/filters/action_creators'
import { bindActionCreators } from 'redux'

export class RawOrganisationBar extends React.Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(type, value) {
    const { updateNextFilter } = this.props

    updateNextFilter(type, value)
  }

  render() {
    const { seasons, className } = this.props

    return (
      <div className={className + " d-flex justify-content-center"}>
        {/* {this.renderDropdown("organisation", organisations)}
        {this.renderDropdown("competition", competitions)} */}
        {this.renderDropdown("season", seasons)}
      </div>
    )
  }

  renderDropdown(type, elements) {
    if (elements.length < 1) {
      return ''
    }

    const allText = `All ${type}s`
    const current = this.props.filters[type] || allText

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
}

const mapStateToProps = createStructuredSelector({
  seasons: kaasSelectors.getSeasons,
  // organisations: kaasSelectors.getOrganisations,
  // competitions: kaasSelectors.getCompetitions,
  filters: kaasSelectors.getActiveFilters
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

const OrganisationBar = connect(mapStateToProps, mapDispatchToProps)(RawOrganisationBar)

export default OrganisationBar