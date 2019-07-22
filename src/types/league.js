import { shape, string, number } from 'prop-types'

const league = shape({
    id: number.isRequired,
    name: string.isRequired,
    competition: string.isRequired,
    organisation: string.isRequired,
})

export default league