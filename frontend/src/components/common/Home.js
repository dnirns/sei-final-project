import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import AnimateText from '../../styles/AnimateText'

class Home extends React.Component {

  render() {
    return (
      <>
        <div className='homepage'>
          <div className='animate-home'>
            <h2 className='home-animated-1'>An</h2>
            <h2 className='home-animated-2'>Exquisite</h2>
            <h2 className='home-animated-3'>Corpse</h2>
          </div>
          {
            isAuthenticated() ?
              <Link to='/drawing'><button className='home-button'><h3 className='crimson-s-light'>Make your Exquisite Corpse</h3></button></Link>
              :
              <Link to='/login'><button className='home-button'><h3 className='home-button'>Log in to Draw</h3></button></Link>
          }
        </div>
        <AnimateText />
      </>
    )
  }
}

export default withRouter(Home)
