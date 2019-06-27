import React from 'react'
import Alert from 'react-bootstrap/Alert'

export function RawErrorBar() {
  return (
    <Alert variant="danger" className="mb-0">There were errors attempting to contact the KAAS server - try refreshing</Alert>
  )
}

const ErrorBar = React.memo(RawErrorBar)

export default ErrorBar