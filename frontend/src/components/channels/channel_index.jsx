import React from 'react';
import { Link } from 'react-router-dom';
import './channel_index.css'

class ChannelIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchChannels();
        window.scrollTo(0, 0);
    }

    handleClick(channelId){
        let newChannels = {
            id: this.props.user.id,
            channels: channelId
        }
        this.props.updateUser(newChannels).then((unused)=>{
            let newMembers = {
                id: channelId,
                members: this.props.user
            }
            
            this.props.updateChannel(newMembers).then( (action)=>{
                //debugger
                this.props.history.push(`/channels/${action.channel.data._id}/${action.channel.data.events[0]._id}`);
            })
        });
        

    }


    render(){
        if(this.props.channels.length === 0 || !this.props.user){
            return null;
        }

        // debugger

        let joinedChannels = [];

        if (this.props.user.channels.length > 0) {
            this.props.user.channels.forEach((channel, index) => {
                joinedChannels.push(this.props.channelObjects[channel]._id)
            })
        }

        let notJoined = [];

        if (joinedChannels.length === 0) {
            notJoined = this.props.channels
        } else {
            this.props.channels.forEach((channel, index) => {
                if (!joinedChannels.includes((channel._id))) {
                    notJoined.push(channel)
                }
            })
        }

        let channelList = notJoined.map((channel, index) => {
            return(
                <li key={index} className="channel-list-item">
                    <Link className="channel-link" to={"/channels/" + channel._id}>{channel.title}</Link>
                    <button className="join-button" onClick={()=>this.handleClick(channel._id)}>JOIN</button>
                </li>
            )
        });
                // <div className="channel-form-button-block">
                //     {channelForm}
                // </div>

        return (
            <div className="signup-bg-image">

                <div className="channel-index-container">
                    <div className="channel-index-list-block">
                        <ul className="channel-index-list">
                            {channelList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndex;