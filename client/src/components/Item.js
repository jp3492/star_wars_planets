import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getResidents } from '../actions'
import { GET_RESIDENTS } from '../actions/types'

class Item extends Component{
  componentWillMount(){
    const { action: { getResidents }, selectedPlanet, dispatch, planets, history } = this.props
    if (planets === [] || selectedPlanet === null) {
      history.push('/')
      return
    }
    dispatch({ type: GET_RESIDENTS, payload: 'load' })
    getResidents(selectedPlanet[0].residents)
  }
  renderInfo(i) {
    const { selectedPlanet } = this.props
    const info = (i.includes('_') === true) ? i.split('_').map( inf => { return inf.charAt(0).toUpperCase() + inf.slice(1) }).join(' '): i.charAt(0).toUpperCase() + i.slice(1)
    return (
      <li key={i}>
        <a>{info}</a>
        <a>{selectedPlanet[0][i]}</a>
      </li>
    )
  }
  renderResident(r) {
    const key = Object.keys(r).filter( i => { return ['birth_year', 'eye_color', 'gender', 'height', 'mass'].includes(i) === true })
    const keys = key.reduce((res, k) => {
      if (k.includes('_') === true) {
        return { ...res, [k]: k.split('_').map( inf => { return inf.charAt(0).toUpperCase() + inf.slice(1) }).join(' ') }
      }
      return { ...res, [k]: k }
    }, {})
    const infos = key.map( k => { return { key: keys[k].charAt(0).toUpperCase() + keys[k].slice(1), value: r[k] } })
    return (
      <li key={r}>
        <ul className='resident'>
          <li className="infoheader"><h3>{r.name}</h3></li>
          {infos.map( i => { return <li><a>{i.key}</a><a>{i.value}</a></li> } )}
        </ul>
      </li>
    )
  }
  renderFilm(f){
    const { title, release_date } = f
    return (
      <li className='films' key={f}>
        <a>{title}</a>
        <a>{release_date}</a>
      </li>
    )
  }
  render(){
    const { selectedPlanet, residents, films } = this.props
    if (selectedPlanet === null) { return null }
    const { name } = selectedPlanet[0]
    const filmNumbers = selectedPlanet[0].films.map( f => { return f.split('/')[5] })
    const inFilms = filmNumbers.map( n => { return films[n-1] })
    const infos = Object.keys(selectedPlanet[0]).filter( i => { return ['name', 'created', 'edited', 'residents', 'url', 'films'].includes(i) === false })
    return (
      <div id="item">
        <div><h3><Link style={{ textDecoration: 'none' }} to="/">{'Planets '+'>'+' '}</Link>{name}</h3></div>
        <div>
          <ul>
            <li className="infoheader"><h3>Information</h3></li>
            {infos.map( i => { return this.renderInfo(i) } )}
            <li className="infoheader"><h3>Movie appearance</h3></li>
            {inFilms.map( f => { return this.renderFilm(f) } )}
          </ul>
        </div>
        <h3 id="residentsHeader">Famous Residents</h3>
        <div>
          {(residents.length === 0) ?
            <ul><li>No famous residents on this planet!</li></ul>:
            <ul>
              {(residents === 'load') ? 'Loading Residents...': residents.map( r => { return this.renderResident(r) } )}
            </ul>
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ data: { selectedPlanet, planets, residents, films } }) => {
  return { selectedPlanet, planets, residents, films }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getResidents }, dispatch), dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item)
