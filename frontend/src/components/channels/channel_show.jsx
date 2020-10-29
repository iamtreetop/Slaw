import React from 'react';
import { Link } from 'react-router-dom';
import './channel_show.css'

class ChannelShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchChannel();
    }

    render() {
        if (!this.props.channel) {
            return null
        }

        // let picture;
        // (this.props.channel.channelPicture) ? picture = this.props.channel.channelPicture : picture = null

        let projectCheck;
        (this.props.channel) ? projectCheck = this.props.channel : projectCheck = null;
        return (
            !projectCheck ? <div></div> : (
                <div className="channel-show-container">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div className="events-section">

                        <div className="section-heading">
                            <h3>Events</h3>
                        </div>
                        <div className="show-list">
                            <ul>
                                {this.props.channel.events.map((event, idx) => {
                                    return (<li key={idx}>
                                        <h5>
                                            <Link to={`/channels/${this.props.channel._id}/${event._id}`}>{event.title}</Link>
                                        </h5>
                                    </li>
                                    )
                                })}
                                <li className="create-event">
                                    <Link classname="create-event-button" to='/events/new'>
                                        Start your next event 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="members-section">
                        <div className="section-heading">
                            Members
                        </div>
                        <div className="show-list">
                            <ul>
                                {this.props.channel.members.map((member, idx)=>{
                                    return (<li key={idx}>
                                        <h5>
                                            {member.handle}
                                        </h5>
                                    </li>
                                )})}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default ChannelShow;