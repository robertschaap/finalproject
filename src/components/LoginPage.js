import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    doRedirect: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const headers = {
      method: 'post',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: this.state.email, password: this.state.password })
    };

    fetch('/api/login', { headers })
      .then(res => res.json())
      .then(result => {
        localStorage.setItem('chip', result.token);
        this.setState({ doRedirect: true });
        this.props.checkAuth();
      });
  }

  render() {
    const { doRedirect, email, password } = this.state;

    if (doRedirect) {
      return (
        <Redirect to='/' push/>
      );
    }

    return (
      <main role='main'>
        <form id='login' onSubmit={this.handleSubmit}>
          <label>E-mail</label>
          <input type='text' name='email' value={email} onChange={this.handleChange}/>
          <label>Password</label>
          <input type='password' name='password' value={password} onChange={this.handleChange}/>
          <button type='submit'>Login</button>
        </form>
      </main>
    );
  }
}

export default LoginPage;
