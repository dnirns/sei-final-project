import React from 'react'
import { Link } from 'react-router-dom'
import { register } from '../../lib/api'
import { } from '../../lib/auth'
import { Segment, Button, Form } from 'semantic-ui-react'
import { registrationSuccess, registrationError } from '../functions/Notifications'
import { ToastContainer } from 'react-toastify'


class Register extends React.Component {

  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {}
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ data, errors })
  }

  handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await register(this.state.data)
      this.props.history.push('/login/')
      registrationSuccess(res.data.message)
    } catch (err) {
      registrationError('Incorrect details, please try again')
      this.setState({ errors: err.response.data })
    }
  }

  render() {
    const { data, errors } = this.state
    return (
      <Segment textAlign='center'>
        <Form>
          <h1 className='crimson'>Register</h1>
          <Form.Field>
            <label>Username:</label>
            <Form.Input
              error={!errors.username ? false :
                errors.username}
              placeholder='Username'
              name='username'
              value={data.username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Email:</label>
            <Form.Input
              error={!errors.email ? false :
                errors.email}
              placeholder='Email'
              name='email'
              value={data.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label label='password'>Password:</label>
            <Form.Input
              error={!errors.password ? false :
                errors.password}
              placeholder='Password'
              name='password'
              type='password'
              value={data.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label label='password'>Password confirmation:</label>
            <Form.Input
              error={!errors.password_confirmation ? false :
                errors.password_confirmation}
              placeholder='Password confirmation'
              name='password_confirmation'
              type='password'
              value={data.passwordconfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmit}><p className='crimson-s'>Submit</p></Button>
          <p>Already registered?
            <Link to='/login'> Login.</Link>
          </p>
        </Form>

        <ToastContainer style={{ textAlign: 'center' }}/>
      </Segment>
    )
  }

}

export default Register
