import React from 'react'
import { Segment, Image, Container, Divider } from 'semantic-ui-react'

class CorpseExample extends React.Component {

  state = {
    data: [],
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
    const data = await res.json()
    this.setState({ data: data })
    this.getHead()
    this.getBody()
    this.getLegs()
    this.getName()
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
    const firstName = this.state.head.title
    const middleName = this.state.body.title
    const lastName = this.state.feet.title
    const name = `${firstName} ${middleName} ${lastName}`
    this.setState({ name: name })
  }

  render() {
    const { head, body, feet, headUser, bodyUser, feetUser } = this.state
    return (
      <>
        <Container textAlign='center'>
          <h3 className='crimson-s'>An Exquisite Corpse,</h3>
          <h3 className='crimson-s-light'>{this.state.name}</h3>
          <Divider hidden/>
          <div>
            <Image className='corpse-img' src={head.url} centered/>
          </div>
          <div>
            <Image className='corpse-img' src={body.url } centered/>
          </div>
          <div>
            <Image className='corpse-img' src={feet.url } centered/>
          </div>
        </Container>
        <Segment basic textAlign='center'>
          <h4 className='crimson-s-light-i'>Head by {headUser},
            body by {bodyUser },
            and feet by {feetUser }
          </h4>
        </Segment>

      </>
    )
  }
}

export default CorpseExample
