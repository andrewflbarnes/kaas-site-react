import React from 'react'
import Button from 'react-bootstrap/Button'
import { string, func } from 'prop-types'

const propTypes = {
  name: string.isRequired,
  match: string,
  onSelect: func.isRequired
}

const defaultProps = {
  match: undefined,
}

const SelectorButton = React.memo(({ name, match, onSelect }) => (
  <Button
    className='col-4 col-md-2'
    variant={
      name === match
        ? 'primary'
        : 'outline-primary'
    }
    onClick={
      () => onSelect(name)
    }
  >
    {name}
  </Button>
))

SelectorButton.propTypes = propTypes
SelectorButton.defaultProps = defaultProps

export default SelectorButton