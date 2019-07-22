import { shape, string } from 'prop-types'

const stateStatusError = shape({
  endpoint: string.isRequired,
  error: string.isRequired,
})

export default stateStatusError