import React from 'react';
import { Link } from 'react-router-dom'
import './nav.css';
import backgroundImage from '../../images/532_-_Boxing-513.png';

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
        let button;

        if (this.props.location.pathname === "/") {
          return (
            <div>
              <Link className="session-button" to={'/signup'}>Signup</Link>
              <Link className="session-button" to={'/login'}>Login</Link>
            </div>
          )
        } else if (this.props.location.pathname === "/signup") {
          return (
            <div>
              <Link className="session-button" to={'/login'}>Login</Link>
            </div>
          )
        } else {
          return (
            <div>
              <Link className="session-button" to={'/signup'}>Signup</Link>
            </div>
          )
  
       }
    }
  }

  render() {
      return (
        <Link to="/events/discover">
          <div className="navbar-container">
              <div className="navbar-wrapper">
                <Link to={'/'} className="navbar-header-text">
                <img src={backgroundImage}/>
                </Link>
                { this.getLinks() }
              </div>
          </div>
        </Link>
      );
  }
}

export default NavBar;