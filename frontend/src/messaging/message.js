import React from 'react';
import config from "../config";
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BottomBar from './bottombar';
import './message.css';
require('dotenv').config()

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: this.props.messages,
            message: '',
            username: '',
            time: '',
            day: ''

        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleContent = this.handleContent.bind(this) 

    }

    componentDidMount() {
        this.socket = io(config[process.env.NODE_ENV].endpoint)
        // this.socket = io(config.endpoint, {
        //     transports: ['polling', 'websocket']
        // })
        // onfig.endpoint, { 
        //     transports: ['websocket', 'polling'], 
        //     // reconnectionDelay: 10000,
        //     // reconnection: true,
        //     // reconnectionAttempts: 10,
        //     // agent: false, // [2] Please don't set this to true
        //     // upgrade: false,
        //     // rejectUnauthorized: false,
        // });

        // Load the last 10 messages in the window.
        // this.socket.on('init', (msg) => {
        //     let msgReversed = msg.reverse();
        //     this.setState((state) => ({
        //         chat: [...state.chat, ...msgReversed],
        //     }), this.scrollToBottom);
        // });
        this.socket.emit('create', this.props.channelId)
        // Update the chat if a new message is broadcasted.
        this.socket.on('push', (msg) => {
            this.setState((state) => ({
                chat: [...state.chat, msg],
            }), this.scrollToBottom);
        });
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    // Save the message the user is typing in the input field.
    handleContent(event) {
        this.setState({
            message: event.target.value,
        });
    }

    //
    // handleName(event) {
    //     this.setState({
    //         username: event.target.value,
    //     });
    // }

    handleSubmit(event) {
        // Prevent the form to reload the current page.
        event.preventDefault();
        // Send the new message to the server.
        const today = new Date();
        const time = today.toLocaleTimeString()
        const day = today.toLocaleDateString()

        this.setState({ time: time})
        this.setState({ day: day })
        this.setState({ username: this.props.username })

        this.socket.emit('message', {
            room: this.props.channelId,
            username: this.props.username,
            message: this.state.message,
            time: time,
            day: day
            // eventId: this.props.eventId
        })
        let message = this.state.message
        setTimeout(() => {
            let newChannel = {id: this.props.channelId, message: 
            {
                message: message, 
                username: this.props.username, 
                time: time,
                day: day
            }}
            this.props.updateChannel(newChannel)
        },1000)
        
        this.setState((state) => {
            // Update the chat with the user's message and remove the current message.
            return {
                chat: [...state.chat, {
                    username: this.props.username,
                    message: this.state.message,
                    time: time,
                    day: day
                }],
                message: '',
                time: '',
                day: ''
            };
        }, this.scrollToBottom);
    }

    // Always make sure the window is scrolled down to the last message.
    scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    
    render() {

        return (
            <div className="App">
                <Paper id="chat" elevation={3}>
                    {this.state.chat.map((el, index) => {
                        
                        return (
                            <div key={index} className="live-chat-box">
                                <div className="live-chat-box-header">
                                    <Typography>
                                        <p className="live-chat-name">{el.username}</p>
                                    </Typography>
                                    <Typography variant="body1" className="live-chat-content">
                                        <p className="live-chat-date">{el.day}</p>
                                        <p className="live-chat-time">{el.time}</p>
                                    </Typography>
                                </div>
                                <Typography variant="body1">
                                    <p className="live-chat-message">{el.message}</p>
                                </Typography>
                            </div>
                        );
                    })}
                    <BottomBar
                        message={this.state.message}
                        handleContent={this.handleContent.bind(this)}
                        handleSubmit={this.handleSubmit.bind(this)}
                        username={this.state.username}
                    />
                </Paper>
            </div>
        );
    }
};

export default Message;