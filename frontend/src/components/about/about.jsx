import React from 'react';
import { Link } from 'react-router-dom'
import "./about.css"
import githubImg from "../../images/github.png"
import linkedin from "../../images/linkedin.png"
import Carousel from 'react-bootstrap/Carousel'
import kevin from "../../images/Kevin_Lai.JPG"
import jd from "../../images/jd.JPG"
import tri from "../../images/tritop.png"
import jacky from "../../images/jacky.PNG"
// import 'bootstrap/dist/css/bootstrap.css';

class About extends React.Component {

    render() {

        let mainGithubRepo = "https://github.com/iamtreetop/Slaw"
        let introduction ="Thank you for using Slaw! We are a group of engineers from App Academy \
        that developed this application from the ground up with the MERN Stack within a 1 week timeframe. \
        We incorporated features using technologies outside of MERN such as Google Maps API and Active.com API to allow \
        search for events at a specific location, and Socket.io to allow real-time chat between users in channels. \
        We hope you enjoyed using our application and feel free to see the main repo below or checkout our bios below and connect with us on LinkedIn! "

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
                    <a href={mainGithubRepo} target="_blank">
                        Click here for our main Github Repo
                        {/* <img src={githubImg} alt=""/> */}
                    </a>
                </div>
                <div className="container">
                    <div className="row">
                        <div class="heading-title text-center">
                            <h3 className="text-uppercase">Our Engineers </h3>
                        </div>
                        <div className="bios">
                            <div className="col-md-4 col-sm-4">
                                <div className="team-member">
                                    <div className="team-img">
                                        <img src={jd} alt="team member" class="img-responsive"/>
                                    </div>
                                        <div className="team-hover">
                                            <div className="desk">
                                                <h4>What's Up!</h4>
                                                <p>I am a Los Angeles based Software Engineer with a passion to build things and explore new possibilities of coding.</p>
                                            </div>
                                            <div className="s-link">
                                                <a href="#"><i class="fa fa-facebook"></i></a>
                                                <a href="#"><i class="fa fa-twitter"></i></a>
                                                <a href="#"><i class="fa fa-google-plus"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="team-title">
                                        <div className="engineer-profile">
                                            <h5>JD Buendia</h5>
                                            <div>
                                                <a href={jdGithub} target="_blank">
                                                    <img src={githubImg} alt="" />
                                                </a>
                                                <a href={jdlinkedIn} target="_blank">
                                                    <img src={linkedin} alt="" />
                                                </a>
                                            </div>
                                        </div>
                                            <span>Full Stack Software Engineer</span>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="team-member">
                                        <div className="team-img">
                                            <img src={tri} alt="team member" class="img-responsive"/>
                                    </div>
                                            <div className="team-hover">
                                                <div className="desk">
                                                    <h4>Hi There!</h4>
                                                    <p>I'm a Los Angeles-based software engineer with a passion for building applications and websites that can bring positivity to the world.</p>
                                                </div>
                                                <div className="s-link">
                                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                                    <a href="#"><i class="fa fa-google-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="team-title">
                                            <div className="engineer-profile">
                                                <h5>Tri Ta</h5>
                                                <div>
                                                    <a href={triGithub} target="_blank">
                                                        <img src={githubImg} alt="" />
                                                    </a>
                                                    <a href={trilinkedIn} target="_blank">
                                                        <img src={linkedin} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                                <span>Full Stack Software Engineer</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="team-member">
                                            <div className="team-img">
                                                <img src={kevin} alt="team member" class="img-responsive"/>
                                    </div>
                                                <div className="team-hover">
                                                    <div className="desk">
                                                        <h4>Hello!</h4>
                                                        <p>I am a full stack software engineer with a passion for web development and machine learning.</p>
                                                    </div>
                                                    <div className="s-link">
                                                        <a href="#"><i class="fa fa-facebook"></i></a>
                                                        <a href="#"><i class="fa fa-twitter"></i></a>
                                                        <a href="#"><i class="fa fa-google-plus"></i></a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="team-title">
                                                <div className="engineer-profile">
                                                    <h5>Kevin Lai</h5>

                                                    <div>
                                                        <a href={kevinGithub} target="_blank">
                                                            <img src={githubImg} alt="" />
                                                        </a>
                                                        <a href={kevinlinkedIn} target="_blank">
                                                            <img src={linkedin} alt="" />
                                                        </a>
                                                    </div>
                                                </div>
                                                    <span>Full Stack Software Engineer</span>
                                            </div>
                                        </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="team-member">
                                            <div className="team-img">
                                                <img src={jacky} alt="team member" class="img-responsive" />
                                            </div>
                                            <div className="team-hover">
                                                <div class="desk">
                                                    <h4>Hello World!</h4>
                                                    <p>I am a Bay Area based Software Engineer with a passion to explore the possibilities of programming and strive for pixel-perfect applications</p>
                                                </div>
                                                <div className="s-link">
                                                    <a href="#"><i class="fa fa-facebook"></i></a>
                                                    <a href="#"><i class="fa fa-twitter"></i></a>
                                                    <a href="#"><i class="fa fa-google-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="team-title">
                                            <div className="engineer-profile">
                                                <h5>Jacky Li</h5>

                                                <div>
                                                    <a href={jackyGithub} target="_blank">
                                                        <img src={githubImg} alt="" />
                                                    </a>
                                                    <a href={jackylinkedIn} target="_blank">
                                                        <img src={linkedin} alt="" />
                                                    </a>
                                                </div>
                                            </div>
                                                <span>Full Stack Software Engineer</span>
                                        </div>
                                    </div>

                        </div>

                                </div>

                            </div>
                <footer>
                    Copyright &copy; 2020 SlawApp
                </footer>
            </div>
        );
    }
}

export default About;