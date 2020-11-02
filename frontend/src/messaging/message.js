import React from 'react';
import config from "../config";
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BottomBar from './bottombar';
import './app.css';
require('dotenv').config()

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: this.props.messages,
            message: '',
            username: '',

        };
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
    handleName(event) {
        this.setState({
            username: event.target.value,
        });
    }

    handleSubmit(event) {
        // Prevent the form to reload the current page.
        event.preventDefault();
        // Send the new message to the server.


        this.socket.emit('message', {
            username: this.props.username,
            message: this.state.message,
            // eventId: this.props.eventId
        })
        let message = this.state.message
        setTimeout(() => {
            let newChannel = {id: this.props.channelId, message: {message: message, username:this.props.username}}
            this.props.updateChannel(newChannel)
        },1000)
        

        this.setState((state) => {
            // Update the chat with the user's message and remove the current message.
            return {
                chat: [...state.chat, {
                    username: this.props.username,
                    message: this.state.message,
                    // time: Date.now()
                }],
                message: '',
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
                        // let month = el.createdAt.slice(5, 7)
                        // let day = el.createdAt.slice(8, 10)
                        // let time = el.createdAt.slice(12, 19)
                        return (
                            <div key={index}>
                                <Typography variant="caption" className="name">
                                    {el.username}
                                </Typography>
                                <Typography variant="body1" className="content">
                                    {el.message}
                                </Typography>
                                <Typography variant="body1" className="content">
                                    {/* <p className="comment-date">({month}/{day})</p>
                                    <p className="comment-time">{time}</p> */}
                                </Typography>
                            </div>
                        );
                    })}
                </Paper>
                <BottomBar
                    message={this.state.message}
                    handleContent={this.handleContent.bind(this)}
                    handleName={this.handleName.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    username={this.state.username}
                />
            </div>
        );
    }
};

export default App;