import React from 'react'
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
      const res = await login(this.state.data)
      setToken(res.data.token)
      this.props.history.push('/drawing')
      loginSuccess(res.data.message)
    } catch (err) {
      loginError()
      console.log(err)
    }
  }

  render() {
    const { data } = this.state
    return (
      <>
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
          <button onClick={loginSuccess}>TOAST</button>
        </Form>
        <ToastContainer style={{ textAlign: 'center' }}/>
      </>

    )
  }

}

export default Login
