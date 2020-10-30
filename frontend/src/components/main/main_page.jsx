import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-bg-image">
        <div className="main-container" >
          <div className="main-message-wrapper">
            <h1  className="main-header">Community</h1>
            <h2  className="sub-header">Never workout alone again</h2>
            <h2  className="sub-header">We can achieve more TOGETHER with SLAW</h2>
          </div>
        </div>  
        {/* <footer>
          Copyright &copy; 2020 SlawApp
        </footer> */}
      </div>
    );
  }
}

export default MainPage;