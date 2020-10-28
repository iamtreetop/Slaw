import React from 'react';
import { Link } from 'react-router-dom';
// import './channel_index.css'

class ChannelShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchChannel();
    }

    render() {
        
        if (!this.props.channel) return null

        let picture;
        (this.props.channel.channelPicture) ? picture = this.props.channel.channelPicture: picture = null

        let projectCheck;
        (this.props.channel) ? projectCheck = this.props.channel : projectCheck = null;
        return (
            !projectCheck ? <div></div> : (
                <div className="channel-show-container">
                    <h1>{this.props.channel.title}</h1>
                    <ul>
                        {this.props.channel.members.map((member, idx)=>{
                            return (<li key={idx}>
                                <h2>
                                    {member.handle}
                                </h2>
                            </li>
                        )})}
                        <img src={picture} alt=""/>
                    </ul>
                </div>
            )
        )
    }
}

export default ChannelShow;