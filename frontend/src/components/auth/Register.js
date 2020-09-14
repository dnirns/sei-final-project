import React from 'react'
import { register } from '../../lib/api'
import { } from '../../lib/auth'
import { Button, Form } from 'semantic-ui-react'


class Register extends React.Component {

  state = {
    data: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleChange = e => {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      await register(this.state.data)
      this.props.history.push('/login')
      alert('welcome')
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { data } = this.state
    return (
      <Form>
        <h1>Login</h1>
        <Form.Field>
          <label>Username</label>
          <input error
            placeholder='Username'
            name='username'
            value={data.username}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder='Email'
            name='email'
            value={data.email}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label label='password'>Password</label>
          <input
            placeholder='Password'
            name='password'
            type='password'
            value={data.password}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label label='password'>Password Confirmation</label>
          <input
            placeholder='Password'
            name='password_confirmation'
            type='password'
            value={data.passwordconfirmation}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        <p>Not registered? <a href="/register">Create an account</a></p>
      </Form>

    )
  }

}

export default Register
