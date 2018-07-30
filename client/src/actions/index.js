import axios from 'axios'
import { GET_PLANETS, GET_RESIDENTS } from '../actions/types'

export const getPlanets = () => async dispatch => {
  let planets = []
  const firstPage = 'https://swapi.co/api/planets'
  const getFilms = await axios.get('https://swapi.co/api/films')
  const getPlanets = async url => {
    const planetPage = await axios.get(url)
    if (planetPage.data.next === null) {
      allPlanets(planets)
    } else {
      planets = planets.concat(planetPage.data.results)
      getPlanets(planetPage.data.next)
    }
  }
  const allPlanets = planets => {
    const films = getFilms.data.results.sort((a, b) => { return new Date(a.release_date) > new Date(b.release_date)})
    dispatch({ type: GET_PLANETS, payload: { planets, films } })
  }
  getPlanets(firstPage)
}

export const getResidents = res => async dispatch => {
  const residents = await Promise.all(res.map(async r => {
    const resident = await axios.get(r)
    return resident.data
  }))
  dispatch({ type: GET_RESIDENTS, payload: residents })
}
