import React from 'react';
import "./main_page.css"

class MainPage extends React.Component {

  render() {
    return (
      <div >
        <div className="main-container" >
          <h1  className="main-header">Welcome to Slaw</h1>
        </div>  
        <footer>
          Copyright &copy; 2020 SlawApp
        </footer>
      </div>
    );
  }
}

export default MainPage;