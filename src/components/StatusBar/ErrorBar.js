import React from 'react'
import Alert from 'react-bootstrap/Alert'

export default React.memo(() => (
  <Alert
    variant="danger"
    className="mb-0"
  >
    There were errors attempting to contact the KAAS server - try refreshing
  </Alert>
))