import React from 'react'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'

export default React.memo(({ loading, errors }) => (
  <>
    {loading > 0 &&
      <LoadingBar />
    }
    {errors.length > 0 &&
      <ErrorBar />
    }
  </>
))