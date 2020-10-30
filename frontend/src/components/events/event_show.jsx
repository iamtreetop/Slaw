import React from "react";
import "./event_show.css"
import { Link } from 'react-router-dom';

class EventShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentEvent: null};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        this.props.fetchEvent(this.props.eventId).then( (action) => {
                //debugger
                this.setState({currentEvent: action.event.data});
            }
        );
        // this.props.fetchChannel(this.props.match.params.channelId)
        //     .then((action) => {
        //         debugger
        //         this.setState({
        //             currentEvent: this.props.channel.events[this.props.eventId]
        //         });
        //     });
        
    }

    handleClick(e, todoId){
        //debugger
        this.props.updateTodo({status: e.target.checked, id: todoId});
    }

    render() {

        if(this.state.currentEvent === null || !this.props.channel) {
            return null;
        }

        // debugger

        let todoList = this.state.currentEvent.todo.map(
            (todo) => {
                //debugger
                return (
                    <li className="todo-list-item">
                        {todo.title}
                        <input type="checkbox" onClick={(e)=>this.handleClick(e, todo._id)}/>
                    </li>
                )
            }
        )

        return (
            // <div className="channel-show-container">
            //     <h1>Welcome to {this.props.channel.title}</h1>
            //     <h2>{this.state.currentEvent.description}</h2>
            //     <button onClick={() => this.props.openModal('todo',this.props.eventId)}>Create New Todo</button>

            //     <ul>{todoList}</ul>
            // </div>
            <div className="event-show-container">
                    
                    <div className="events-section">
                        <div className="section-heading">
                            <h3>Events</h3>
                        </div>
                        <div className="show-list">
                            <ul className="show-list-items">
                                {this.props.channel.events.map((event, idx) => {
                                    return (<li key={idx}>
                                        <h5>
                                            <Link to={`/channels/${this.props.channel._id}/${event._id}`}>{event.title}</Link>
                                        </h5>
                                    </li>
                                    )
                                })}
                                <li className="create-event">
                                    <Link className="create-event-button" to={`/events/${this.props.channel._id}/new`}>
                                        New SLAP
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div className="event-detail-container">
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
                    </div> */}
                    <div className="main-detail-wrapper">
                        <div className="event-details-container">
                            <div className="event-details-left">
                                <h1>{this.state.currentEvent.title}</h1>
                                <h2>Welcome to {this.props.channel.title} Channel</h2>
                                <p>`Description: {this.state.currentEvent.description}</p>
                            </div>
                            <div className="event-details-right">
                                <h1>Workout List</h1>
                                <button onClick={() => this.props.openModal('todo',this.props.eventId)}>Create New Todo</button>
                                <ul>{todoList}</ul>
                            </div>
                        </div>
                        <div className="comment-section">
                            <h1>Comments go here</h1>
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
    }
}

export default EventShow;