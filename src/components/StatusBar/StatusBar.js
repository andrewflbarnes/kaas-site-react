import React from 'react'
import { arrayOf, number } from 'prop-types'
import ErrorBar from './ErrorBar'
import LoadingBar from './LoadingBar'
import { stateStatusError } from '../../types'

const propTypes = {
  errors: arrayOf(stateStatusError).isRequired,
  loading: number.isRequired
}

const StatusBar = React.memo(({ loading, errors }) => (
  <>
    {loading > 0 &&
      <LoadingBar />
    }
    {errors.length > 0 &&
      <ErrorBar />
    }
  </>
))

StatusBar.propTypes = propTypes

export default StatusBar