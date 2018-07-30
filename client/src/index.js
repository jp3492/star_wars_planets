import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { HashRouter, Route } from 'react-router-dom'
import logger from 'redux-logger'

import App from './components/App'
import List from './components/List'
import Item from './components/Item'

import reducer from './reducers/index'

const store = createStore(reducer, {}, applyMiddleware(thunk, logger))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App>
        <Route exact path="/" component={List} />
        <Route exact path="/planet" component={Item} />
      </App>
    </HashRouter>
  </Provider>,
    document.querySelector('#root'));
