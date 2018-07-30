import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PAGE, SELECT_PLANET } from '../actions/types'

class List extends Component{
  renderPlanet(p, i){
    const { dispatch, history } = this.props
    const { name, population, films, residents } = p
    const filmNumbers = films.map( f => { return Number(f.split('/')[5]) })
    return (
      <li className="planet" key={name}
        onClick={ () => {
          dispatch({ type: SELECT_PLANET, payload: name })
          history.push('/planet')
        }}>
        <a>{name}</a>
        <a>{population}</a>
        <a>{(filmNumbers.length === 0) ? 'None': filmNumbers.sort((a,b) => { return a > b }).join(', ')}</a>
        <a>{residents.length}</a>
      </li>
    )
  }
  render(){
    const { filteredPlanets, dispatch, loading, page } = this.props
    if (loading) {
      return (
        <div id="loading">
          <div></div>
          <a>Loading planets...</a>
        </div>
      )
    }
    const mapOver = filteredPlanets.slice((0 + (page * 6)), (0 + (page * 6) + 6))
    const pages = Math.ceil(filteredPlanets.length / 6)
    return (
      <ul id="list">
        <li id="listHeader">
          <a>Name</a>
          <a>Population</a>
          <a>Movies</a>
          <a>Characters</a>
        </li>
        {mapOver.map((p, i) => { return this.renderPlanet(p) } )}
        <li id="listFooter">
          <div className={(page !== 0) ? 'clickable': null} onClick={(page !== 0) ? () => dispatch({ type: PAGE, payload: -1 }): null }>
            <i className="material-icons">navigate_before</i>
            <a>Previous</a>
          </div>
          <a>{(page + 1)+' '+'/'+' '+pages}</a>
          <div className={(page + 1 !== pages) ? 'clickable': null} onClick={(page + 1 !== pages) ? () => dispatch({ type: PAGE, payload: 1 }): null }>
            <a>Next</a>
            <i className="material-icons">navigate_next</i>
          </div>
        </li>
      </ul>
    )
  }
}
const mapStateToProps = ({ data: { planets, filteredPlanets }, display: { loading, page } }) => {
  return { planets, loading, page, filteredPlanets }
}
export default connect(mapStateToProps)(List)
