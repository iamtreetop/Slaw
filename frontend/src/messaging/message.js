import React from 'react';
import config from "../config";
import io from 'socket.io-client';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import BottomBar from './bottombar';
import './app.css';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            content: '',
            name: '',
            time: ''
        };
    }

    componentDidMount() {
        this.socket = io(config.endpoint, { transport: ['websocket'] });

        // Load the last 10 messages in the window.
        this.socket.on('init', (msg) => {
            let msgReversed = msg.reverse();
            this.setState((state) => ({
                chat: [...state.chat, ...msgReversed],
            }), this.scrollToBottom);
        });

        // Update the chat if a new message is broadcasted.
        this.socket.on('push', (msg) => {
            this.setState((state) => ({
                chat: [...state.chat, msg],
            }), this.scrollToBottom);
        });
    }

    // Save the message the user is typing in the input field.
    handleContent(event) {
        this.setState({
            content: event.target.value,
        });
    }

    //
    handleName(event) {
        this.setState({
            name: event.target.value,
        });
    }

    handleSubmit(event) {
        // Prevent the form to reload the current page.
        event.preventDefault();

        // Send the new message to the server.
        this.socket.emit('message', {
            name: this.props.username,
            content: this.state.content,
            // time: Date.now()
        });

        this.setState((state) => {
            // Update the chat with the user's message and remove the current message.
            return {
                chat: [...state.chat, {
                    name: this.props.username,
                    content: state.content,
                    // time: Date.now()
                }],
                content: '',
            };
        }, this.scrollToBottom);
    }

    // Always make sure the window is scrolled down to the last message.
    scrollToBottom() {
        const chat = document.getElementById('chat');
        chat.scrollTop = chat.scrollHeight;
    }

    
    render() {
        debugger
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
                                    {el.name}
                                </Typography>
                                <Typography variant="body1" className="content">
                                    {el.content}
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
                    content={this.state.content}
                    handleContent={this.handleContent.bind(this)}
                    handleName={this.handleName.bind(this)}
                    handleSubmit={this.handleSubmit.bind(this)}
                    name={this.state.name}
                />
            </div>
        );
    }
};

export default App;