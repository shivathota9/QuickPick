import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://i.pinimg.com/564x/9f/fd/f2/9ffdf2c13c2bc006aaf84547f347c709.jpg"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://i.pinimg.com/564x/9f/fd/f2/9ffdf2c13c2bc006aaf84547f347c709.jpg"
          className="login-img"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="data:image/png;base64,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"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
