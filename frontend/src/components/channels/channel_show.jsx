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

    componentDidUpdate(prevProps) {

        if(!this.props.channel){
            this.props.fetchChannel();
        }
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
                        <div className="section-heading">
                            <h3>Events</h3>
                        </div>
                        <div className="show-list">
                            <ul>
                                {this.props.channel.events.map((event, idx) => {
                                    return (<li key={idx}>
                                        <Link className="show-list-items" to={`/channels/${this.props.channel._id}/${event._id}`}>{event.title}</Link>
                                    </li>
                                    )
                                })}
                                <li className="create-event">
                                    <Link to={`/events/${this.props.channel._id}/new`}>
                                        <button className="create-event-button">New SLAW</button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="event-detail-container">
                         <div className="event-left-wrapper">
                            <div className="left-text-wrapper">
                                <h3>TITLE</h3>
                                <h4>DESCRIPTION</h4>
                            </div>
                            <div className="event-todo-list">TODO-List</div>
                         </div>
                         <div className="event-right-wrapper">
                             <div className="comment-container">
                                 <ul>COMMENTS</ul>
                             </div>
                         </div>
                    </div>

                    <div className="channel-show-container">
                        <h1>Welcome to {this.props.channel.title}</h1>
                        <h2>{this.state.currentEvent.description}</h2>
                        <button onClick={() => this.props.openModal('todo',this.props.eventId)}>Create New Todo</button>

                        {/* <ul>{todoList}</ul> */}
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