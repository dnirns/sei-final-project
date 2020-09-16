import React from 'react'
import { Grid, Image, Segment } from 'semantic-ui-react'



class testRequest extends React.Component {

  state = {
    data: [
    ]
  }

  async componentDidMount() {
    const res = await fetch('/api/drawings')
    const data = await res.json()
    this.setState({ data: data })
    console.log(this.state.data)
  }


  getData = () => {

  }

  render() {
    return (
      <>
        <Segment basic textAlign='center'>
          <h2>All the parts...</h2>
        </Segment>
        <Grid container relaxed columns={3}>
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
    )
  }

}

export default testRequest
