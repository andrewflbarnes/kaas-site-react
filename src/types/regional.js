import { shape, string, number } from 'prop-types'

const regional = shape({
    id: number.isRequired,
    name: string.isRequired,
    season: string.isRequired,
    league: string.isRequired,
    competition: string.isRequired,
    organisation: string.isRequired,
})

export default regional