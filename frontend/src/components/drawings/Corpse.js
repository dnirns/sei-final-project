import React from 'react'
import { Segment, Image, Container, Divider } from 'semantic-ui-react'
import { getUser } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

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
    feetUser: '',
    name: ''
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
    this.getName()
  }

  getUserPart = () => {
    const userDrawings = []
    this.state.data.map((drawing) => {
      if (drawing.owner.id === this.state.currentUserData.id) {
        return userDrawings.push(drawing)
      } else {
        return false
      }
    })
    const lastDrawing = userDrawings[userDrawings.length - 1]
    this.setState({ latestUserDrawing: lastDrawing })
  }

  getHead = () => {
    const headsArray = []
    this.state.data.map((drawing) => {
      if (drawing.category === 'Head') {
        return headsArray.push(drawing)
      } else {
        return false
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
      } else {
        return false
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
      } else {
        return false
      }
    })
    const randomFeet = Math.floor(Math.random() * feetArray.length)
    this.setState({ feet: feetArray[randomFeet] })
    this.setState({ feetUser: this.state.feet.owner.username })
  }

  getName = () => {
    let firstName = ''
    let middleName = ''
    let lastName = ''
    this.state.latestUserDrawing.category === 'Head'
      ?
      firstName = this.state.latestUserDrawing.title
      :
      firstName = this.state.head.title
    this.state.latestUserDrawing.category === 'Body'
      ?
      middleName = this.state.latestUserDrawing.title
      :
      middleName = this.state.body.title
    this.state.latestUserDrawing.category === 'Feet'
      ?
      lastName = this.state.latestUserDrawing.title
      :
      lastName = this.state.feet.title
    const name = `${firstName} ${middleName} ${lastName}`
    this.setState({ name: name })
  }

  render() {
    const {
      head,
      body,
      feet,
      currentUserData,
      latestUserDrawing,
      headUser,
      bodyUser,
      feetUser
    } = this.state

    return (
      <>
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
              <h3 className='crimson-s'>Welcome your Exquisite Corpse...</h3>
              <h3 className='crimson-s-light'>{this.state.name}</h3>
              <Divider hidden/>
              <div>
                <Image className='corpse-img' src={latestUserDrawing.category === 'Head' ? latestUserDrawing.url : head.url } centered/>
              </div>
              <div>
                <Image className='corpse-img' src={latestUserDrawing.category === 'Body' ? latestUserDrawing.url : body.url } centered/>
              </div>
              <div>
                <Image className='corpse-img' src={latestUserDrawing.category === 'Feet' ? latestUserDrawing.url : feet.url } centered/>
              </div>
              <Segment basic textAlign='center'>
                <h4 className='crimson-s-light-i'>Head by {latestUserDrawing.category === 'Head' ? currentUserData.username :  headUser },
                body by {latestUserDrawing.category === 'Body' ? currentUserData.username :  bodyUser },
                and feet by {latestUserDrawing.category === 'Feet' ? currentUserData.username :  feetUser }
                </h4>
              </Segment>
            </>
          }
        </Container>
      </>
    )
  }
}

export default Corpse
