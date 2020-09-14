import React from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { Button, Form } from 'semantic-ui-react'
import { loginSuccess, loginError } from '../../lib/notifications'
import { ToastContainer } from 'react-toastify'

class Login extends React.Component {

  state = {
    data: {
      email: '',
      password: ''
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
      const res = await login(this.state.data)
      setToken(res.data.token)
      this.props.history.push('/drawing')
      loginSuccess(res.data.message)
    } catch (err) {

      this.setState({ errors: err.response.data })
      loginError(`${this.state.errors.message}, try again.`)
    }
  }

  render() {
    const { data, errors } = this.state
    return (
      <>
        <Form>
          <h1>Login</h1>
          <Form.Field>
            <label>Email</label>
            <Form.Input
              error={!errors.message ? false : errors.message}
              name='email'
              value={data.email}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label label='password'>Password</label>
            <Form.Input
              error={!errors.message ? false : errors.message}
              placeholder='Password'
              name='password'
              type='password'
              value={data.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
          <p>Not registered?
            <Link to='/register'> Create an account</Link>
          </p>

        </Form>
        <ToastContainer style={{ textAlign: 'center' }}/>
      </>

    )
  }

}

export default Login
