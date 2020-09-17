import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './components/Home'
import Nav from './components/Nav'
import Drawing from './components/Drawing'
import Gallery from './components/Gallery'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Corpse from './components/drawings/Corpse'
import CorpseExample from './components/drawings/CorpseExample'
import ErrorPage from './components/common/ErrorPage.js'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Container style={{ marginTop: '2.5em' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path ='/drawing' component={Drawing} />
          <Route path ='/gallery' component={Gallery} />
          <Route path='/corpse' component={Corpse} />
          <Route path='/corpse-example' component={CorpseExample} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
