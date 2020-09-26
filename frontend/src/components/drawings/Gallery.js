import React from 'react'
import { Grid, Image, Container, Divider } from 'semantic-ui-react'
import PuffLoader from 'react-spinners/PuffLoader'
import { isAuthenticated } from '../../lib/auth'

class testRequest extends React.Component {
  state = {
    data: [],
    loading: true

  }

  async componentDidMount() {
    const res = await fetch('/api/drawings/')
    const data = await res.json()
    this.setState({ data: data, loading: false })
  }

  render() {
    if (this.state.loading === true)  {
      return (
        <div className='homepage'>
          <p>Loading...</p>
          <PuffLoader/>
        </div>
      )
    } else {
      return (
        <Container textAlign='center'>
          {
            !isAuthenticated() &&
            <div>
              <h4>Please Log In</h4>
            </div>
          }
          {
            isAuthenticated() &&
            <>
              <h3 className='crimson'>The Previous Corpses</h3>
              <Divider hidden />
              <Divider hidden />
              <Grid container relaxed columns={4}>
                {this.state.data.map((drawing) => {
                  return <Grid.Column key={drawing.id} className="gallery-item" src={drawing.url}>
                    <Image src={drawing.url}/>
                    <h3>{drawing.title}</h3>
                    <h5>{drawing.category}</h5>
                    <p>By {drawing.owner.username}</p>
                  </Grid.Column>
                })
                }
              </Grid>
            </>
          }
        </Container>
      )
    }
  }
}

export default testRequest
