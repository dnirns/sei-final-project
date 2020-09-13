import React from 'react'
import { login } from '../../lib/api'
import { Button, Form } from 'semantic-ui-react'

class Login extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
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
      await login(this.state.data)
      this.props.history.push('/drawing')
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
        <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        <p>Not registered? <a href="/register">Create an account</a></p>
      </Form>

    )
  }

}

export default Login
