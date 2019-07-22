import { shape, string } from 'prop-types'

const stateActiveFilters =  shape({
    organisation: string,
    competition: string,
    season: string,
})

export default stateActiveFilters