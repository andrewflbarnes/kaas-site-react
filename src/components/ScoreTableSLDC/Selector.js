import React from 'react'
import { arrayOf, string, object, bool, func } from 'prop-types'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import SelectorButton from './SelectorButton'

const propTypes = {
  elements: arrayOf(object).isRequired,
  match: string,
  onSelect: func.isRequired,
  all: bool
}

const defaultProps = {
  match: undefined,
  all: false
}

const Selector = React.memo(({ elements, match, onSelect, all }) => (
  <ButtonToolbar>
    <ButtonGroup className="mb-2 col-12 justify-content-center">
      {all &&
        <SelectorButton
          name="All"
          match={match}
          onSelect={onSelect}
        />
      }
      {elements.map(e =>
        <SelectorButton
          key={e.name}
          name={e.name}
          match={match}
          onSelect={onSelect}
        />
      )}
    </ButtonGroup>
  </ButtonToolbar>
))

Selector.propTypes = propTypes
Selector.defaultProps = defaultProps

export default Selector