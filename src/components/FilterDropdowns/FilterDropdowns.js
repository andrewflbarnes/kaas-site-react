import React from 'react'
import { connect } from 'react-redux'
import * as kaasSelectors from '../../selectors/kaas'
import { createStructuredSelector } from 'reselect'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Row from 'react-bootstrap/Row'
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
    const { seasons } = this.props

    return (
      <Row className="d-flex justify-content-center">
        {/* {this.renderDropdown("organisation", organisations)}
        {this.renderDropdown("competition", competitions)} */}
        {this.renderDropdown("season", seasons)}
      </Row>
    )
  }

  renderDropdown(type, elements) {
    if (elements.length < 1) {
      return ''
    }

    const allText = `All ${type}s`
    const current = this.props.filters[type] || allText

    return (
      <DropdownButton
        key={type}
        className="mr-2"
        size="sm"
        title={current}
        drop="left"
        onSelect={eventKey => this.handleSelect(type, eventKey)}
      >
        <Dropdown.Header>{type}</Dropdown.Header>
        {elements.map(e => 
          <Dropdown.Item key={e.name} eventKey={e.name}>{e.name}</Dropdown.Item>
        )}
        <Dropdown.Divider />
        <Dropdown.Item key={allText} eventKey="">{allText}</Dropdown.Item>
      </DropdownButton>
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