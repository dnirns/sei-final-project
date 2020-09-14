import React from 'react'
import { Grid, Image } from 'semantic-ui-react'



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
        <Grid container columns={3}>
          {this.state.data.map((drawing) => {
            return <Grid.Column key={drawing.id} className="gallery-item" src={drawing.url}>
              <Image src={drawing.url}/>
              <h3>{drawing.title}</h3>
              <p>{drawing.owner.username}</p>
            </Grid.Column>
          })
          }
        </Grid>
      </>
    )
  }

}

export default testRequest
