import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './components/Home'
import Nav from './components/Nav'
import Drawing from './components/Drawing'
import TestRequest from './testRequest'



const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path ='/drawing' component={Drawing} />
          <Route path ='/request' component={TestRequest} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
