import React from "react";
import "./event_show.css"
import { Link } from 'react-router-dom';

class EventShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentEvent: null, comment: ""};
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchEvent(this.props.eventId)

    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.channelId !== this.props.match.params.channelId) {
            this.props.fetchEvent(this.props.eventId).then((action) => {
                this.setState({ currentEvent: action.event.data });
            }
            );
        }
        // if (this.state.comment === "") {
        //     debugger
        //     this.props.fetchEvent(this.props.eventId)
        // } 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.channelId !== this.props.match.params.channelId) {
            this.props.fetchEvent(this.props.eventId)
            .then((action) => {
                this.setState({ currentEvent: action.event.data, todo: action.event.data.todo });
            }
            );
        }
        // debugger
        // if ((prevProps.match.params.channelId === this.props.match.params.channelId) && prevProps.event[this.props.eventId]) {
        //     if (prevProps.event[this.props.eventId].todo.length < (this.props.event[this.props.eventId]).todo.length) {
        //         this.props.fetchEvent(this.props.eventId)
        //     }
        // }
    }

    handleModal(e) {
        this.props.openModal('todo', this.props.eventId)
        // this.props.fetchEvent(this.props.eventId).then((action) => {
        //     this.setState({ currentEvent: action.event.data, todo: action.event.data.todo });
        // })
    }

    handleClick(e, todoId){
        //debugger
        this.props.updateTodo({status: e.target.checked, id: todoId});
    }
    

    handleCommentSubmit(e) {
        e.preventDefault();
        this.props.createComment({comment: this.state.comment, handle: this.props.handle})
            .then((comment) => {
                let newEventState = {
                    id: this.props.eventId,
                    comment: comment.data._id
                }
                this.props.updateEvent(newEventState).then(
                    (action) => {
                        console.log("SUCCESS")
                    }
                )
                this.setState({comment: ""})
            })
    }

    handleChangeComment(comment) {
        return (e) => {
            this.setState({
                [comment]: e.currentTarget.value
            })
        }
    }

    render() {
        if(!this.props.channel || this.props.event === null){
            return null;
        }
        if (Object.keys(this.props.event).length === 0) {
            return null;
        }
        if (!this.props.event[this.props.eventId]) {
            return null;
        }
        let todoList = this.props.event[this.props.eventId] ? this.props.event[this.props.eventId].todo.map(
            (todo) => {
                //debugger
                return (
                    <li className="todo-list-item">
                        {todo.title}
                        <input type="checkbox" onClick={(e)=>this.handleClick(e, todo._id)}/>
                    </li>
                )
            }
        ) : this.state.currentEvent[this.props.eventId].todo.map(
            (todo) => {
                //debugger
                return (
                    <li className="todo-list-item">
                        {todo.title}
                        <input type="checkbox" onClick={(e) => this.handleClick(e, todo._id)} />
                    </li>
                )
            }
        )
        debugger
        let comments =
        (this.props.event[this.props.eventId].comments.length > 0) ? this.props.event[this.props.eventId].comments.map(
            (comment) => {
                return (
                    <li >
                        {comment.comment}
                        {comment.author}
                    </li>
                )
            }
        ) : <p>Comment Add here</p>

        return (
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
                                        Start your next event 
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="main-detail-wrapper">
                        <div className="event-details-container">
                            <div className="event-details-left">
                                <h1>{this.props.event[this.props.eventId].title}</h1>
                                <h2>Welcome to {this.props.channel.title} Channel</h2>
                                <p>`Description: {this.props.event[this.props.eventId].description}</p>
                            </div>
                            <div className="event-details-right">
                                <h1>Workout List</h1>
                                <button onClick={() => this.handleModal()}>Create New Todo</button>
                                <ul>{todoList}</ul>
                            </div>
                        </div>

                        <div className="comment-section">
                            <div className="comment-boxs">
                                {comments}
                            </div>
                            <form onSubmit={this.handleCommentSubmit}>
                                <textarea name="" id="" cols="30" rows="10" 
                                    onChange={this.handleChangeComment("comment")} 
                                    value={this.state.comment}
                                ></textarea>
                                <input type="submit" value="Add Comment"/>
                            </form>
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