import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default class ErrorBar extends React.PureComponent {

  render() {
    return (
      <Alert variant="danger">There were errors attempting to contact the KAAS server - try refreshing</Alert>
    )
  }
}