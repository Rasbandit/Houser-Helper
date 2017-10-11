import React from 'react';

export default class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  updateUsername(username) {
    this.setState({
      username
    });
  }

  updatePassword(password) {
    this.setState({
      password
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={(e) => { this.updateUsername(e.target.value); }}
          placeholder="Username"
        />
        <input type="password" placeholder="Password" />
        <button>Login</button>
      </div>
    );
  }
}
