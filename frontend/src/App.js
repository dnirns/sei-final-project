import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Home from './components/Home'
import Nav from './components/Nav'
import Drawing from './components/Drawing'
import Gallery from './components/Gallery'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Combined from './components/drawings/Combined'
import Single from './components/drawings/Single'




const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Container style={{ marginTop: '7em' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path ='/drawing' component={Drawing} />
          <Route path ='/gallery' component={Gallery} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path ='/drawing/:id' component={Single} />
          <Route path='/combo' component={Combined} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
