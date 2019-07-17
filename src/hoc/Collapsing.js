import React from 'react'
import Collapse from 'react-bootstrap/Collapse'

export default function collapsing(Component) {
  class Collapsing extends React.Component {
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
  return React.memo(Collapsing)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}