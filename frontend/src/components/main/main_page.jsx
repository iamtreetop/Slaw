import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-bg-image">
        <div className="main-container" >
          <div className="main-message-wrapper">
            <h2  className="main-header">Community</h2>
            <h4  className="sub-header">Never workout alone again</h4>
            <h4  className="sub-header">We can achieve more TOGETHER with SLAW 
            </h4>
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