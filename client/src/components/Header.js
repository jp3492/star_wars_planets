import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getPlanets } from '../actions'
import { GET_PLANETS, SEARCH } from '../actions/types'

class Header extends Component{
  componentWillMount(){
    const { dispatch, action: { getPlanets } } = this.props
    dispatch({ type: GET_PLANETS, payload: 'load' })
    getPlanets()
  }
  render(){
    const { dispatch, search, loading } = this.props
    return (
      <div id="header">
       {(loading === true) ?
        <input id="disabledSearch" value="Search disabled while loading..." disabled="true" />:
        <input value={search} onChange={ e => dispatch({ type: SEARCH, payload: e.target.value }) } placeholder="Search planets..."/>
       }
      </div>
    )
  }
}
const mapStateToProps = ({ data: { search }, display: { loading } }) => {
  return { search, loading }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getPlanets }, dispatch), dispatch }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
