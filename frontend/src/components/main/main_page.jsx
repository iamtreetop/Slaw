import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-bg-image">
        <div className="main-container" >
          <div className="main-message-wrapper">
            <h1  className="main-header">Your Place to Slaw </h1>
            <h2  className="sub-header">Organize your activities with friends</h2>
            <h2  className="sub-header">Workout together.</h2>
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