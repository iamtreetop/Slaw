import React from 'react';
import { Link } from 'react-router-dom'
import backgroundImage from '../../images/532_-_Boxing-513.png';
import bannerImage from "../../images/MINISLAWBANNER.png";
import './nav.css';

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
                <button className="session-button" onClick={this.logoutUser}>Logout</button>
            </div>
        );
      } else {
        
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
          <div className="navbar-container">
              <div className="navbar-wrapper">
                <Link to={'/'} className="navbar-header-text">
                  <img src={backgroundImage}/>
                </Link>
                <Link to="/events/discover">
                  <img className="main-banner" src={bannerImage} />
                </Link> 
                { this.getLinks() }
                <Link className="about-button" to={'/about'}>About</Link>
              </div>
          </div>
      );
  }
}

export default NavBar;