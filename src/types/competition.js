import { shape, string, number } from 'prop-types'

const competition = shape({
    id: number.isRequired,
    name: string.isRequired,
    organisation: string.isRequired,
})

export default competition