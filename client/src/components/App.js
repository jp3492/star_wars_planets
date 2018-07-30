import React from 'react'
import './styles/app.css'

import Header from './Header'

export default ({ children }) => {
  return (
    <div id="wrapper">
      <Header />
      {children}
    </div>
  )
}
