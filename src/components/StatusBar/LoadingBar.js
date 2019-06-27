import React from 'react'
import Alert from 'react-bootstrap/Alert'

export function RawLoadingBar() {
  return (
    <Alert variant="success" className="mb-0">Loading...</Alert>
  )
}

const LoadingBar = React.memo(RawLoadingBar)

export default LoadingBar