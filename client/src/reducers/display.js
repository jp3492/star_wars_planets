import { GET_PLANETS, PAGE, GET_RESIDENTS, SEARCH } from '../actions/types'

const INITIAL_STATE = {
  loading: true,
  loadingResidents: false,
  page: 0
}

export default function(state = INITIAL_STATE, action) {
  const { type, payload } = action
  switch (type) {
    case SEARCH:
      return { ...state, page: 0 }
    case GET_RESIDENTS:
      if (payload === 'load') {
        return { ...state, loadingResidents: true }
      }
      return { ...state, loadingResidents: false }
    case PAGE:
      return { ...state, page: state.page + payload }
    case GET_PLANETS:
      if (payload === 'load') {
        return { ...state, loading: true }
      }
      return { ...state, loading: false }
    default:
      return state
  }
}
