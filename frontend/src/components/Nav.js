import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Segment } from 'semantic-ui-react'

const Nav = () => {
  return (
    <Segment basic>
      <Menu secondary>
        <Link to='/'>
          <Menu.Item as='a'>
            Home
          </Menu.Item>
        </Link>
        <Link to='/drawing'>
          <Menu.Item as='a'>
            Draw
          </Menu.Item>
        </Link>
        <Link to='/gallery'>
          <Menu.Item as='a'>
            Gallery
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Dropdown item simple text='My Account'>
            <Dropdown.Menu >
              <Link to='/login'>
                <Dropdown.Item  as='a'>Login</Dropdown.Item>
              </Link>
              <Link to='/register'>
                <Dropdown.Item  as='a'>Register</Dropdown.Item>
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    </Segment>
  )
}

export default Nav

