import { shape, string, number } from 'prop-types'

const organisation = shape({
    id: number.isRequired,
    name: string.isRequired,
    competitionCount: number.isRequired,
})

export default organisation