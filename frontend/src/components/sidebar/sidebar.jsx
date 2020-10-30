import React from "react"
import { Link } from 'react-router-dom';
import "./sidebar.css"

class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchChannels();
    }


    render() {

        if (!this.props.channels) return null;

        let userChannels = this.props.channels.filter(channel => channel.members.includes(this.props.userId));

        //debugger

        let channelList = userChannels.map((channel, index) => {
            return (
                <li key={index} className="tooltip">
                    <Link to={`/channels/${channel._id}/${channel.events[0]._id}`}>
                        <img src={channel.channelPicture} className="sidebar-channel-items"/>
                        <p className="channel-text">{channel.title}</p>
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