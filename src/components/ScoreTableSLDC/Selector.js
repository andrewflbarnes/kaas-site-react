import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'

export const SelectorButton = React.memo(({ name, match, onSelect }) => (
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

export default React.memo(({ elements, match, onSelect, all }) => (
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