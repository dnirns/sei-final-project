import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'
import { logout, isAuthenticated } from '../lib/auth'
import { logoutSuccess } from '../lib/notifications'
import { ToastContainer } from 'react-toastify'

class Nav extends React.Component {

  handleLogOut = () => {
    logout()
    logoutSuccess()
  }

  render() {
    return (
      <>
        <Segment basic>
          <Menu secondary className='nav'>
            <Link to='/'>
              <Menu.Item>
                Home
              </Menu.Item>
            </Link>
            {
              !isAuthenticated() && <Link to='/corpse-example'><Menu.Item as='a'>Meet a Corpse</Menu.Item></Link>
            }
            {
              isAuthenticated() && <Link to='/drawing'><Menu.Item as='a'>Draw!</Menu.Item></Link>
            }
            {
              isAuthenticated() && <Link to='/gallery'><Menu.Item as='a'>Gallery</Menu.Item></Link>
            }
            {
              isAuthenticated() && <Link to='/corpse'><Menu.Item as='a'>Your Exquisite Corpse</Menu.Item></Link>
            }
            <Menu.Menu position='right'>
              <Dropdown item simple text='My Account'>
                <Dropdown.Menu>
                  {
                    isAuthenticated() &&
                      <Link to='/login'>
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
        <ToastContainer style={{ textAlign: 'center' }}/>
      </>
    )
  }
}

export default withRouter(Nav)
