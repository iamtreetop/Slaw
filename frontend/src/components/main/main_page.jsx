import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div className="main-bg-image">
        <div className="main-container" >
          <div className="main-message-wrapper">
            <h2  className="main-header">Community</h2>
            <h4  className="sub-header">stop working out alone</h4>
            <h4  className="sub-header">we can achieve more TOGETHER with SLAW 
            </h4>
          </div>
        </div>  
      </div>
    );
  }
}

export default MainPage;