import React from 'react'
import { register } from '../../lib/api'
import { } from '../../lib/auth'
import { Container, Button, Form } from 'semantic-ui-react'
import { loginSuccess, loginError } from '../../lib/notifications'
import { ToastContainer } from 'react-toastify'


class Register extends React.Component {

  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    errors: {

    }
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
      loginSuccess(res.data.message)
      this.props.history.push('/login')
    } catch (err) {
      loginError('Incorrect Details')
      this.setState({ errors: err.response.data })
      console.log(this.state.errors)

    }
  }

  render() {
    const { data, errors } = this.state
    return (
      <Container>
        <Form>
          <h1>Register</h1>
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
            <label label='password'>Password Confirmation:</label>
            <Form.Input
              error={!errors.password_confirmation ? false :
                errors.password_confirmation}
              name='password_confirmation'
              type='password'
              value={data.passwordconfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
          <p>Not registered? <a href="/register">Create an account</a></p>
        </Form>
        <ToastContainer style={{ textAlign: 'center' }}/>
      </Container>
    )
  }

}

export default Register
