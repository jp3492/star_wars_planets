import axios from 'axios'
import { GET_PLANETS, GET_RESIDENTS } from '../actions/types'

export const getPlanets = () => async dispatch => {
  let planets = []
  const firstPage = 'https://swapi.co/api/planets'
  //get list of all start wars films
  const getFilms = await axios.get('https://swapi.co/api/films')
  //function to get all planets from each page. The api requires multiple requests, cause its split into pages
  const getPlanets = async url => {
    const planetPage = await axios.get(url)
    //check if current page has a next attribute, which contains the link for the next page
    if (planetPage.data.next === null) {
      //if its null its on the last page
      allPlanets(planets)
    } else {
      //concat every page together with the others
      planets = planets.concat(planetPage.data.results)
      getPlanets(planetPage.data.next)
    }
  }
  const allPlanets = planets => {
    //sort films by release date
    const films = getFilms.data.results.sort((a, b) => { return new Date(a.release_date) > new Date(b.release_date)})
    dispatch({ type: GET_PLANETS, payload: { planets, films } })
  }
  getPlanets(firstPage)
}

export const getResidents = res => async dispatch => {
  //loop over all residents links to fetch their information
  const residents = await Promise.all(res.map(async r => {
    const resident = await axios.get(r)
    return resident.data
  }))
  dispatch({ type: GET_RESIDENTS, payload: residents })
}
