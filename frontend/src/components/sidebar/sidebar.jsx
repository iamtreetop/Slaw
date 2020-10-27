import React from "react"
import { Link } from 'react-router-dom';
import "./sidebar.css"

class SideBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let channelList = this.props.channels.map((channel, index) => {
            return (
                <button className="sidebar-channel-items">
                    <Link to={"/channels/" + channel._id}>{channel.title}</Link>
                </button>
            )
        })

        const channelForm = (
            <button onClick={() => this.props.openModal('channel')}
                className="sidebar-form">+</button>
        );

        return(
            <>
                <div className="sidebar-container">
                    <button className="sidebar-channel-items">
                        <Link to={"/channels/"}>home</Link>
                    </button>
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