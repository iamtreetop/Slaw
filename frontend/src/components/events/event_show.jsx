import React from "react";
// import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "./event_show.css"
import { Link } from 'react-router-dom';
import EventMap from "../map/map";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as legoData from "../../legoloading.json";
import * as doneData from "../../doneloading.json";
import Message from "../../messaging/message"

class EventShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentEvent: null,
            editingChannelTitle: false,
            channelTitle: "",
            comment: "",
            loading: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChangeComment = this.handleChangeComment.bind(this);
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

        this.leaveChannel = this.leaveChannel.bind(this);
        this.updateChannelTitle = this.updateChannelTitle.bind(this);
        this.openEditChannelTitle = this.openEditChannelTitle.bind(this);
        this.setChannelTitle = this.setChannelTitle.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleJoin = this.handleJoin.bind(this);

        // this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        this.setState({ loading: true })
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
        this.props.fetchEvent(this.props.eventId)
        
        this.props.fetchChannel();
        
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.channelId !== this.props.match.params.channelId) {
            this.props.fetchChannel()
            this.props.fetchEvent(this.props.eventId)
            .then((action) => {
                this.setState({ currentEvent: action.event.data, todo: action.event.data.todo, participants: action.event.data.participants, loading: true });
                setTimeout(() => {
                    this.setState({ loading: false });
                }, 500);
            }
            );
        }

        if (prevProps.eventId !== this.props.match.params.eventId) {
            this.props.fetchEvent(this.props.eventId)
                .then((action) => {
                    this.setState({ currentEvent: action.event.data, todo: action.event.data.todo, participants: action.event.data.participants });
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
    

    openEditChannelTitle(){
        this.setState({editingChannelTitle: true, channelTitle: this.props.channel.title}); 
    }

    setChannelTitle(){
        return e => {
            this.setState({
                channelTitle: e.currentTarget.value
            })
        }
    }

    updateChannelTitle(e){
        if(e.key === "Enter"){
            this.props.updateChannel({title: this.state.channelTitle, id: this.props.channel._id }).then(
                (action) => {
                    this.setState({editingChannelTitle: false})
                }
            )
        }
    }

    leaveChannel(){
        this.props.updateUser({removeChannel: true, channels: this.props.channel._id, id: this.props.userId }).then(
            (action) => {
                this.props.updateChannel({removeCurrentUser: true, members: this.props.userId, id: this.props.channel._id}).then(
                    (action) => {
                        this.props.history.push(`/channels/`);
                    }
                )
        });
    }

    handleCommentSubmit(e) {
        // e.preventDefault();
        if(e.key === "Enter") {
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
    }

    handleChangeComment(comment) {
        return (e) => {
            this.setState({
                [comment]: e.currentTarget.value
            })
        }
    }

    handleDelete(eventId) {
        this.props.deleteEvent(eventId)
            .then((action) => {
                this.props.fetchChannel()
                this.props.history.push(`/channels/${this.props.channel._id}/${this.props.channel.events[0]._id}`)
            })
    }

    handleLeave(e) {
        this.props.updateEvent({removeParticipant: true, id: this.props.match.params.eventId, participants: {id: this.props.userId}})
        .then((action)=>{
            this.props.history.push(`/channels/${this.props.channel._id}/${this.props.channel.events[0]._id}`)
        })
    }

    handleJoin(e) {
        this.props.updateEvent({ id: this.props.match.params.eventId, participants: { id: this.props.userId } })
            .then((action) => {
                this.props.history.push(`/channels/${this.props.channel._id}/${this.props.match.params.eventId}`)
            })
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

        let participants = this.props.event[this.props.eventId] ? this.props.event[this.props.eventId].participants.map(
            (participants) => {
                return (
                    <li className="todo-list-item">
                        {participants.handle}
                    </li>
                )
            }
        ) : this.state.currentEvent[this.props.eventId].participants.map(
            (participants) => {
                return (
                    <li className="todo-list-item">
                        {participants.handle}
                    </li>
                )
            }
        )


        let comments =
        (this.props.event[this.props.eventId].comments.length > 0) ? this.props.event[this.props.eventId].comments.map(
            (comment) => {
                let month = comment.date.slice(5,7)
                let day = comment.date.slice(8,10)
                let time = comment.date.slice(12,19)
                return (
                    <>  
                        <div className="comment-header-text-box">
                            <div className="comment-header-text">
                                <p className="comment-author">{comment.author}</p>
                                <p className="comment-date">({month}/{day})</p>
                                <p className="comment-time">{time}</p>
                            </div>
                            <p className="comment-comment" >{comment.comment} </p>

                        </div>
                    </>
                )
            }
        ) : <p className="comment-holder-text">Post Here</p>

        let eventTitle = `Post on #${this.props.event[this.props.eventId].title}`


        let leave = (this.props.userId !== this.props.event[this.props.eventId].author) && this.props.event[this.props.match.params.eventId].title !== "General" ?
            <div className="participants-dashboard">
                <div className="leave-event">
                    <button onClick={() => this.handleLeave()}>Decommit From This Event</button>
                </div>
            </div> : <div></div>;
        // debugger
        
        // let join = (!(this.props.event[this.props.eventId].participants.includes(this.props.userId))) && this.props.event[this.props.match.params.eventId].title !== "General" ? 
        let exists = false;
        this.props.event[this.props.eventId].participants.forEach(participant=>{
            if (participant._id === this.props.userId) {
                exists = true;
            }
        })
        let join = (!exists) && this.props.event[this.props.match.params.eventId].title !== "General" ?
           <div className="potential-participant-dashboard">
                <div className="join-event">
                    <button onClick={() => this.handleJoin()}>Commit to This Event</button>
                </div>
            </div> : <div></div>

        let editDelete = (this.props.userId === this.props.event[this.props.eventId].author) && this.props.event[this.props.match.params.eventId].title !== "General" ?
            <div className="authors-dashboard">
                <div>
                    <button className="delete-event-button" onClick={() => this.handleDelete(this.props.eventId)}>Delete Event</button>
                    <span>This cannot be undone</span>
                </div>
                <div className="edit-event">
                    <Link className="create-event-button" to={`/events/${this.props.channel._id}/${this.props.match.params.eventId}/edit`}>
                        Edit This Event
                </Link>
                </div>
            </div> : <div></div>;

        let username = this.props.user.handle  
        let display = !this.state.loading ? (
            <div className="event-show-container">
                    <div className="events-section">
                        <div className="channel-edit-button">
                            {
                                this.props.channel.admin === this.props.userId ? 
                                <button className="channel-button-edit"onClick={() => this.openEditChannelTitle()}>Edit Channel Name</button> :
                                <button className="channel-button-edit" onClick={() => this.leaveChannel()}>Leave Channel</button>
                            }
                            {
                                this.state.editingChannelTitle ?
                                    <input type="text"
                                        value={this.state.channelTitle}
                                        onChange={this.setChannelTitle()}
                                        onKeyDown={this.updateChannelTitle}/> : ""
                            }
                        </div>
                        <div className="section-heading">
                            <span className="events-header-text">Events</span>
                        </div>
                        <div className="show-list">
                            <ul className="show-list-items">
                                {this.props.channel.events.map((event, idx) => {
                                    return (<li key={idx}>
                                        <Link className="show-list-items-link"to={`/channels/${this.props.channel._id}/${event._id}`}>
                                            <span className="show-list-items-text">#{event.title}</span>
                                        </Link>
                                    </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <Link className="create-event-button" to={`/events/${this.props.channel._id}/new`}>
                            Add an Event
                        </Link>
                    </div>
                <div className="main-detail-wrapper">
                    <div className="event-details-container">
                        <div className="event-details-left">
                            <h2>Welcome to {this.props.channel.title}</h2>
                            <h1>#{this.props.event[this.props.eventId].title}</h1>
                            {this.props.event[this.props.eventId].title === "General" ? <ul><b>You can do all of the following in this channel:</b>
                                {this.props.event[this.props.eventId].description.split("\n").map(
                                    (item, index) => {
                                        return (
                                            <li key={index}>{item}</li>
                                        )
                                    }
                                )}
                                And most of all, <b>Enjoy SLAW with your friends!</b>
                            </ul> : (
                                <>
                                    <h2>Description</h2>
                                    <p>{this.props.event[this.props.eventId].description}</p>
                                </>
                            )}
                            {join}
                            {leave}
                            {editDelete}
                        </div>
                        <div className="event-details-right">
                            <div className="workout-list">
                                <h1>Event Checklist</h1>
                                <ul>{todoList}</ul>
                                <button className="create-todo-button"onClick={() => this.handleModal()}>Create New Todo</button>
                            </div>
                            <div className="participants-list">
                                <h1>Participants</h1>
                                <ul>{participants}</ul>
                            </div>
                            <div className="members-section">
                                <div className="section-heading">
                                    <p className="member-header">Members</p>
                                    </div>
                                <div className="show-list-members">
                                    <ul>
                                        {this.props.channel.members.map((member, idx) => {
                                            return (<li key={idx}>
                                                <h5 className="members">
                                                    {member.handle}
                                                </h5>
                                            </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="bottom-section">
                        <Message className="event-chat-container"
                            username={username} eventId={this.props.eventId}
                            updateChannel={this.props.updateChannel}
                            channelId={this.props.channel._id}
                            messages={this.props.channel.messages} />
                        <div className="comment-section">
                            <div className="comment-box-wrapper">
                                {comments}
                            </div>
                            {/* <form onSubmit={this.handleCommentSubmit}> */}
                            <textarea name="" id=""
                                onChange={this.handleChangeComment("comment")}
                                placeHolder={eventTitle}
                                value={this.state.comment}
                                onKeyDown={this.handleCommentSubmit}
                                className="comment-text-box"
                            ></textarea>
                            {/* <input type="submit" value="Add Comment"/> */}
                            {/* </form> */}
                        </div>
                    </div>

                </div>
            </div>
        ) : 
        <div className="loading-parent">
            <ReactLoading type={"bars"} color={"white"} height={'20%'} width={'20%'} />
        </div>
        return (
            <div>
                {display}
            </div>
        )
    }
}

export default EventShow;