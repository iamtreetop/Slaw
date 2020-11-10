import React from 'react';
import { Link } from 'react-router-dom'
import "./about.css"


class About extends React.Component {

    render() {

        let mainGithubRepo = "https://github.com/iamtreetop/Slaw"
        let introduction ="Thank you for using Slaw! We are a group of engineers from App Academy \
        that developed this application within a 1 week timeframe and was built with utilizing the MERN Stack. \
        We incorporated features using technologies outside of MERN such as Google Maps API and Active.com API to allow \
        search for events at a specific location, and Socket.io to allow real-time chat between users in channels. \
        We hope you enjoyed using our application and feel free to see the main repo below or connect with us on LinkedIn! "

        let jdlinkedIn = "https://www.linkedin.com/in/jd-buendia-66ab7483/"
        let jdGithub = "https://github.com/jonathan-dwight"

        let trilinkedIn = "https://www.linkedin.com/in/trivta/"
        let triGithub = "https://github.com/iamtreetop"

        let jackylinkedIn = "https://www.linkedin.com/in/xlihuang/";
        let jackyGithub = "https://github.com/jackyli97";

        let kevinlinkedIn = "http://linkedin.com/in/kevinlai247";
        let kevinGithub = "https://github.com/Kevin-Lai";
    
        return (
            <div className="about-page-container">
                <div className="about-page-header">
                    {introduction}
                    {/* <a href={mainGithubRepo}>
                        <img src="../../frontend/images/github.png" alt=""/>
                    </a> */}
                <footer>
                    Copyright &copy; 2020 SlawApp
                </footer>
                </div>
            </div>
        );
    }
}

export default About;