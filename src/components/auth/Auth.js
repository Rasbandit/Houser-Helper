import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getHouses, getFavorites } from '../../ducks/reducer';

import houseImg from './../../images/auth_logo.png';

class Auth extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.props.getHouses();
    this.props.getFavorites();
  }

  login(loginInfo) {
    axios.post('/api/auth/login', loginInfo)
      .then((response) => {
        if(response.status === 200) {
          this.props.history.push('/dashboard');
        }
      })
      .catch((err) => {
        alert('nope');
      });
  }

  register(registerInfo) {
    if(registerInfo.username && registerInfo.password) {
      axios.post('/api/auth/register', registerInfo)
        .then((response) => {
          if (response.status === 200) {
            this.props.history.push('/dashboard');
          }
        })
        .catch((err) => {
          alert('pick a better name');
        });
    } else {
      alert('Fill in the info please ⏰');
    }
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
      <div
        className="auth"
        onKeyUp={(e) => {
          if(e.keyCode === 13) {
            this.login(this.state);
          }
        }}
      >
        <img src={houseImg} alt="Its a pic of a house, I wouldn't worry about it grandma" />
        <div className="inputs">
          <h3>Username</h3>
          <input
            type="text"
            value={this.state.username}
            onChange={(e) => { this.updateUsername(e.target.value); }}
          />
        </div>
        <div className="inputs">
          <h3>Password</h3>
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => { this.updatePassword(e.target.value); }}
          />
        </div>

        <div className="buttons">
          <div className="button light-green" onClick={() => { this.login(this.state); }}>Login</div>
          <div className="button dark-green" onClick={() => { this.register(this.state); }}>Register</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { getHouses, getFavorites })(Auth);
