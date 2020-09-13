import React from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'



class testRequest extends React.Component {

  state = {
    data: [
    ]
  }

  async componentDidMount() {
    const res = await fetch('/api/drawings')
    const data = await res.json()
    this.setState({ data: data })
    console.log(this.state.data[0].url)
  }


  getData = () => {

  }

  render() {
    return (
      <>

        <h1>GALLERY OF DRAWINGS</h1>

        <Grid container columns={3}>
          {this.state.data.map((drawing) => {
            return <Grid.Column key={drawing.id} className="gallery-item" src={drawing.url}>
              <Image src={drawing.url}/></Grid.Column>
          })
          }
        </Grid>



      </>
    )
  }

}

export default testRequest
