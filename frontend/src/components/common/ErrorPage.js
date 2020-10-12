import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'


const ErrorPage = () => {

  return (
    <Container text textAlign='center'>
      <h1>Oops, nothing to see here....</h1>
      <Link to='/'><Button>Go Home?</Button></Link>
    </Container>

  )
}

export default ErrorPage
