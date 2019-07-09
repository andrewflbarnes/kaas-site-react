import React from 'react'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'

export function RawStatusBar({ loading, errors }) {
  return (
    <>
      {loading > 0 && <LoadingBar />}
      {errors.length > 0 && <ErrorBar />}
    </>
  )
}

const StatusBar = React.memo(RawStatusBar)

export default StatusBar