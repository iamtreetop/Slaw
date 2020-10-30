import React from 'react';
import { Link } from 'react-router-dom'
import './nav.css'


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
      e.preventDefault();
      this.props.logout();
  }

  getLinks() {
      if (this.props.loggedIn) {
        return (
            <div className="logout-wrapper">
                {/* <Link to={'/profile'}>Profile</Link> */}
                <button className="session-button" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        return (
            <div>
                <Link className="session-button" to={'/signup'}>Signup</Link>
                <Link className="session-button" to={'/login'}>Login</Link>
            </div>
        );
      }
  }

  render() {
      return (
        <div className="navbar-container">
            <div className="navbar-wrapper">
              <h1>Slaw 🥊</h1>
              { this.getLinks() }
            </div>
        </div>
      );
  }
}

export default NavBar;