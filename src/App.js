import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

import './styles/index.css'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/*" component={NotFound} />
    </Switch>
  </Router>
)

export default App
