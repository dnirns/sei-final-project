import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Segment, Button } from 'semantic-ui-react'

const Home = () => {
  return (
    <Container textAlign='center'>

      <Segment basic>
        <Link to='/drawing'><Button size='huge'>Make an Exquisite Corpse</Button></Link>
      </Segment>
    </Container>


  )
}

export default Home
