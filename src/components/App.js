import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import TestPage from './TestPage';
import LoginPage from './LoginPage';

class App extends React.Component {
  state = {
    loggedIn: false,
  }

  checkAuth = () => {
    const headers = new Headers();
    headers.append('auth', localStorage.getItem('chip'));

    fetch('/api/verify', { headers })
      .then(res => {
        if (res.status === 200) {
          this.setState({ loggedIn: true });
        }
      });
  }

  handleLogout = () => {
    localStorage.clear();
    this.setState({ loggedIn: false });
  }

  componentWillMount() {
    this.checkAuth();
  }

  render() {
    const { loggedIn } = this.state;

    return (
      <BrowserRouter>
        <div>
          <Header auth={loggedIn} handleLogout={this.handleLogout}/>
          {loggedIn ? (
            <div>
              <Redirect to='/' />
              <Route exact path='/' component={TestPage} />
            </div>
          ) : (
            <div>
              <Redirect to='/login' />
              <Route path='/login' render={() => <LoginPage checkAuth={this.checkAuth} />} />
            </div>
          )}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
