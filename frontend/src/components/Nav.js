import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'
import { logout, isAuthenticated } from '../lib/auth'


class Nav extends React.Component {

  state = {
    loggedIn: false
  }



  handleLogOut = () => {
    logout()
  }


  render() {
    return (
      <Segment basic>
        <Menu secondary className='nav'>
          <Link to='/'>
            <Menu.Item as='a'>
              Home
            </Menu.Item>
          </Link>
          {
            isAuthenticated() && <Link to='/drawing'><Menu.Item as='a'>Draw</Menu.Item></Link>
          }
          {
            isAuthenticated() && <Link to='/gallery'><Menu.Item as='a'>Gallery</Menu.Item></Link>
          }
          {
            isAuthenticated() && <Link to='/corpse'><Menu.Item as='a'>Exquisite Corpse</Menu.Item></Link>
          }

          <Menu.Menu position='right'>
            <Dropdown item simple text='My Account'>
              <Dropdown.Menu>
                {
                  isAuthenticated() &&
                    <Link>
                      <Dropdown.Item as='a' onClick={this.handleLogOut}>Logout</Dropdown.Item>
                    </Link>
                }

                {
                  !isAuthenticated() &&
                  <Link to='/login'>
                    <Dropdown.Item inverted as='a'>Login</Dropdown.Item>
                  </Link>
                }

                {
                  !isAuthenticated() &&
                  <Link to='/register'>
                    <Dropdown.Item inverted as='a'>Register</Dropdown.Item>
                  </Link>
                }
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}


export default Nav



// isLoggedIn = () => {
//   if (isAuthenticated()) {
//     return true
//   } else {
//     return false
//   }
// }

