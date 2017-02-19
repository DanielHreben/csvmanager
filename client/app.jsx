import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import { List, Upload, NotFound } from './pages'
import { Container } from './components'

render((
  <Router history={browserHistory}>
    <Route path='/' component={Container}>
      <IndexRoute component={List} />
      <Route path='list' component={List} />
      <Route path='upload' component={Upload} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
), document.getElementById('app'))
