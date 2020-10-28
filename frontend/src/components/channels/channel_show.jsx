import React from 'react';
import { Link } from 'react-router-dom';
// import './channel_index.css'
import EventFormContainer from '../events/event_form_container';

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
                    <div className="events-section">
                        <ul>
                            {this.props.channel.events.map((member, idx) => {
                                return (<li key={idx}>
                                    <h4>
                                        {member.handle}
                                    </h4>
                                </li>
                                )
                            })}
                            <li className="create-event">
                                <Link classname="create-event-button">
                                    Start your next event 
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="todos-comments-section">

                    </div>
                    <div className="members-section">
                        <ul>
                            {this.props.channel.members.map((member, idx)=>{
                                return (<li key={idx}>
                                    <h4>
                                        {member.handle}
                                    </h4>
                                </li>
                            )})}
                        </ul>
                    </div>
                    <h1>{this.props.channel.title}</h1>
                </div>
            )
        )
    }
}

export default ChannelShow;