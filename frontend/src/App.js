import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './components/Home'
import Nav from './components/Nav'

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Container>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
