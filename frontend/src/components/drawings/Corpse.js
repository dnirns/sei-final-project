import React from 'react'
import { Segment, Image, Container } from 'semantic-ui-react'
import { getUser } from '../../lib/api'



class Corpse extends React.Component {

  state = {
    data: [],
    currentUserData: [],
    latestUserDrawing: {},
    head: {},
    body: {},
    feet: {},
    headUser: '',
    bodyUser: '',
    feetUser: ''
  }

  async componentDidMount() {
    const res = await fetch('/api/drawings')
    const userRes = await getUser()
    const data = await res.json()
    this.setState({ data: data })
    this.setState({ currentUserData: userRes.data })
    this.getHead()
    this.getBody()
    this.getLegs()
    this.getUserPart()
    console.log(this.state.currentUserData)
  }


  getUserPart = () => {
    const userDrawings = []
    this.state.data.map((drawing) => {
      if (drawing.owner.id === this.state.currentUserData.id)
        return userDrawings.push(drawing)
    })
    const lastDrawing = userDrawings[userDrawings.length - 1]
    this.setState({ latestUserDrawing: lastDrawing })
  }

  getHead = () => {
    const headsArray = []
    this.state.data.map((drawing) => {
      if (drawing.category === 'Head') {
        return headsArray.push(drawing)
      }
    })
    const randomHead = Math.floor(Math.random() * headsArray.length)
    this.setState({ head: headsArray[randomHead] })
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

    const { head, body, feet, currentUserData, latestUserDrawing, data, headUser, bodyUser, feetUser } = this.state
    return (
      <>
        <Container textAlign='center'>
          <Segment basic>
            <h2>Your Exquisite Corpse</h2>
          </Segment>
          <div>
            <Image src={latestUserDrawing.category === 'Head' ? latestUserDrawing.url : head.url } size='medium' centered/>
          </div>
          <div>
            <Image src={latestUserDrawing.category === 'Body' ? latestUserDrawing.url : body.url } size='medium' centered/>
          </div>
          <div>
            <Image src={latestUserDrawing.category === 'Feet' ? latestUserDrawing.url : feet.url } size='medium' centered/>
          </div>
        </Container>
        <Segment basic textAlign='center'>
          <p>Head by {latestUserDrawing.category === 'Head' ? currentUserData.username :  headUser },
            body by {latestUserDrawing.category === 'Body' ? currentUserData.username :  bodyUser },
            and feet by {latestUserDrawing.category === 'Feet' ? currentUserData.username :  feetUser }
          </p>
        </Segment>
      </>
    )
  }

}

export default Corpse
