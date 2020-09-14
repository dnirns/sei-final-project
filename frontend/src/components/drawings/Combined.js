import React from 'react'
import { Segment, Image, Container } from 'semantic-ui-react'



class testRequest extends React.Component {

  state = {
    data: [],
    head: {},
    body: {},
    feet: {}
  }

  async componentDidMount() {
    const res = await fetch('/api/drawings')
    const data = await res.json()
    this.setState({ data: data })

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
    console.log(this.state.head)
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
    console.log(this.state.body)
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
    console.log(this.state.feet)
  }


  render() {
    return (
      <>
        <Segment basic>
          <h2>Exquisite Corpse</h2>
        </Segment>
        <button onClick={this.getHead}>Get Heads</button>

        <button onClick={this.getBody}>Get Bodies</button>
        <button onClick={this.getLegs}>Get Legs</button>


        <Container>
          <div>
            <Image src={this.state.head.url} size='medium'/>
          </div>
          <div>
            <Image src={this.state.body.url} size='medium'/>
          </div>
          <div>
            <Image src={this.state.feet.url} size='medium'/>
          </div>
        </Container>
        {/* <Container>
          {this.state.data.map((drawing) => {
            if (drawing.title === 'Body') {
              return <div key={drawing.id} className="gallery-item" src={drawing.url}>
                <Image src={drawing.url}/>
              </div>
            }

          })
          }
        </Container> */}

      </>
    )
  }

}

export default testRequest
