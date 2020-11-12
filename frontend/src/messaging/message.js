import React from 'react';
import config from "../config";
import io from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BottomBar from './bottombar';
import './message.css';
import { animateScroll } from 'react-scroll'
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
        this.socket.emit('create', this.props.channelId)
        this.socket.on('push', (msg) => {
            this.setState((state) => ({
                chat: [...state.chat, msg],
            }), this.scrollToBottom);
        });
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    handleContent(event) {
        this.setState({
            message: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
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

    scrollToBottom() {
        // animateScroll.scrollToBottom( {
        //     containerId: "chatbox-container"
        // })
        const chat = document.getElementById('chat');
        chat.scrollBottom = chat.scrollHeight;
    }

    
    render() {

        return (
            <div className="App">
                <Paper id="chat" elevation={3}>
                    
                    <div className="chatbox-container">
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
                    </div>

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