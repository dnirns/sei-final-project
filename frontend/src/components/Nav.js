import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'

const Nav = () => {
  return (
    // <Menu secondary>
    //   <Dropdown item icon='paint brush big' simple>
    //     <Dropdown.Menu>
    //       <Link to='/drawing'>
    //         <Dropdown.Item>
    //           Draw
    //         </Dropdown.Item>
    //       </Link>
    //       <Dropdown.Item>
    //         Login
    //       </Dropdown.Item>
    //       <Dropdown.Item>
    //         Register
    //       </Dropdown.Item>
    //       <Link to='/'>
    //         <Dropdown.Item>
    //           Home
    //         </Dropdown.Item>
    //       </Link>
    //     </Dropdown.Menu>
    //   </Dropdown>
    // </Menu>
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

      <Menu.Menu position='right'>
        <Dropdown item simple text='My Account'>
          <Dropdown.Menu >
            <Link to='login'>
              <Dropdown.Item>Login</Dropdown.Item>
            </Link>
            <Link to='register'>
              <Dropdown.Item>Register</Dropdown.Item>
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>

  )
}

export default Nav

