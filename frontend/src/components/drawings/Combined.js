import React from 'react'
import { Segment, Image, Container, Grid } from 'semantic-ui-react'



class testRequest extends React.Component {

  state = {
    data: [],
    head: {},
    body: {},
    feet: {},
    headUser: '',
    bodyUser: '',
    feetUser: ''
  }

  async componentDidMount() {
    const res = await fetch('/api/drawings')
    const data = await res.json()
    this.setState({ data: data })
    this.getHead()
    this.getBody()
    this.getLegs()
  }

  getHead = () => {
    const headsArray = []
    this.state.data.map((drawing) => {
      if (drawing.category === 'Head') {
        return headsArray.push(drawing)
      }
    })
    const randomHead = Math.floor(Math.random() * headsArray.length)

    this.setState({ head: headsArray[randomHead]})
    this.setState({ headUser: this.state.head.owner.username })
  }
  getBody = () => {
    const bodyArray = []
    this.state.data.map((body) => {
      if (body.category === 'Body') {
        return bodyArray.push(body)
      }
    })
    const randomBody = Math.floor(Math.random() * bodyArray.length)
    this.setState({ body: bodyArray[randomBody] })
    this.setState({ bodyUser: this.state.body.owner.username })
  }
  getLegs = () => {
    const feetArray = []
    this.state.data.map((foot) => {
      if (foot.category === 'Feet') {
        return feetArray.push(foot)
      }
    })
    const randomFeet = Math.floor(Math.random() * feetArray.length)
    this.setState({ feet: feetArray[randomFeet] })
    this.setState({ feetUser: this.state.feet.owner.username })
  }


  render() {
    return (
      <>
        <Container textAlign='center'>
          <Segment basic>
            <h2>Your Exquisite Corpse</h2>
          </Segment>
          <div>
            <Image src={this.state.head.url} size='medium' centered/>
          </div>
          <div>
            <Image src={this.state.body.url} size='medium' centered/>
          </div>
          <div>
            <Image src={this.state.feet.url} size='medium' centered/>
          </div>
        </Container>
        <Segment basic textAlign='center'>
          <p>Head by {this.state.headUser}, body by {this.state.bodyUser}, and feet by {this.state.feetUser}</p>
        </Segment>
      </>
    )
  }

}

export default testRequest
