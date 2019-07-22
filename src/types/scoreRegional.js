import { shape, string, number } from 'prop-types'

const scoreRegional = shape({
    club: string.isRequired,
    team: string.isRequired,
    name: string.isRequired,
    season: string.isRequired,
    league: string.isRequired,
    competition: string.isRequired,
    organisation: string.isRequired,
    regional: string.isRequired,
    division: string.isRequired,
    position: number.isRequired,
    score: number.isRequired,
})

export default scoreRegional