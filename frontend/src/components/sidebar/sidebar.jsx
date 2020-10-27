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
                <li className="sidebar-channel-items">
                    <Link to={"/channels/" + channel._id}>{channel.title}</Link>
                </li>
            )
        })

        return(
            <>
                <div className="sidebar-container">
                    <Link to={"/channels/"} className="sidebar-channel-items">home</Link>
                    <div className="guild-separator">-</div>
                    {channelList}
                </div>
            </>
        )
    }
}

export default SideBar;