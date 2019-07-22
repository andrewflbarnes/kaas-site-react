import React from 'react'
import { bool } from 'prop-types';
import Collapse from 'react-bootstrap/Collapse'

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const propTypes = {
  expanded: bool
}

const defaultProps = {
  expanded: true
}

export default function collapsing(Component) {
  class Collapsing extends React.PureComponent {
    render() {
      let { expanded } = this.props
      if (typeof expanded === 'undefined') {
        expanded = true
      }
      return (
        <Collapse in={expanded}>
          <div>
            <Component {...this.props} />
          </div>
        </Collapse>
      )
    }
  }

  Collapsing.displayName = `Collapsing(${getDisplayName(Component)})`
  Collapsing.propTypes = propTypes
  Collapsing.defaultProps = defaultProps
  
  return React.memo(Collapsing)
}