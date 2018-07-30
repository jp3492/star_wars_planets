import { GET_PLANETS, SELECT_PLANET, SEARCH, GET_RESIDENTS } from '../actions/types'

const INITIAL_STATE = {
  planets: [],
  filteredPlanets: [],
  selectedPlanet: null,
  residents: [],
  films: [],
  search: ''
}

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action
  switch (type) {
    case GET_RESIDENTS:
      return { ...state, residents: payload }
    case SEARCH:
      return { ...state, search: payload, filteredPlanets: state.planets.filter( p => { return p.name.toLowerCase().includes(payload.toLowerCase()) } ) }
    case GET_PLANETS:
      if (payload !== 'load') {
        return { ...state, planets: payload.planets, filteredPlanets: payload.planets, films: payload.films }
      }
      return state
    case SELECT_PLANET:
      return { ...state, selectedPlanet: state.planets.filter( p => { return p.name === payload }) }
    default:
      return state
  }
}
