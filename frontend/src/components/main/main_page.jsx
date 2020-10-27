import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div >
        <div className="main-container" >
          <div className="main-message-wrapper">
            <h1  className="main-header">Welcome to Slaw</h1>
            <h2  className="sub-header">Your Place to Slaw </h2>
            <h2  className="sub-header">Whether you’re strong like JD, buff like Jacky, or just looking for a workout partner, Slaw is  your place to connect.</h2>
          </div>
        </div>  
        <footer>
          Copyright &copy; 2020 SlawApp
        </footer>
      </div>
    );
  }
}

export default MainPage;