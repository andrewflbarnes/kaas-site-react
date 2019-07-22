import { arrayOf, shape, number } from 'prop-types'
import stateStatusError from './stateStatusError'

const stateStatus = shape({
    errors: arrayOf(stateStatusError),
    loading: number.isRequired
})

export default stateStatus