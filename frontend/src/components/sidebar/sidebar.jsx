import React from "react"
import { Link } from 'react-router-dom';
import "./sidebar.css"

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: false
        }
    }

    componentDidMount() {
        this.props.fetchChannels().then(
                (action) => {
                    this.setState({fetching: true})
                } 
            );
    }


    render() {

        if (!this.state.fetching) return null;
        // if (!this.props.currentUser || !this.props.currentUser.channels || this.props.currentUser.events) return null;

        // let userChannels = this.props.currentUser.channels.filter(channel => channel.members.includes(this.props.userId));

       debugger

        let channelList = this.props.currentUser.channels.map((channel, index) => {
            let channelEvent = this.props.channels[channel];
            debugger
            return (
                <li key={index} className="tooltip">
                    <Link to={`/channels/${channelEvent.id}/${channelEvent.events[0].id}`}>
                        <img src={channelEvent.channelPicture} className="sidebar-channel-items"/>
                        <p className="channel-text">{channelEvent.title}</p>
                    </Link>
                </li>
            )
        })

        const channelForm = (
            <>
                <div className="tooltip">
                    <button onClick={() => this.props.openModal('channel')}
                        className="sidebar-channel-items">
                        <p className="channel-create-text">+</p>
                        </button>
                    <span className="sidebar-form-text"> Create a channel </span>
                </div>
            </>
        );

        return(
            <>
                <div className="sidebar-container">
                    <div className="tooltip">
                        <button className="sidebar-channel-items">
                            <Link to={"/channels"}>home
                                <p className="home-text">home</p>
                            </Link>
                        </button>
                    </div>
                    <div className="guild-separator"></div>
                    {channelList}
                    <div className="guild-separator"></div>
                    {channelForm}
                </div>
            </>
        )
    }
}

export default SideBar;