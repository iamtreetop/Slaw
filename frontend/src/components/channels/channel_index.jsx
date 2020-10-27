import React from 'react';
import { Link } from 'react-router-dom';
import './channel_index.css'

class ChannelIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchChannels();
    }

    handleClick(channelId){
        let newMembers = {
            id: channelId,
            members: this.props.user
        }

        this.props.updateChannel(newMembers).then( (action)=>{
            // this.props.history.push(`/channels/${action.channel.id}`)
        })
    }

    render(){
        if(!this.props.channels){
            return null;
        }

        let channelList = this.props.channels.map((channel) => {
            return(
                <li className="channel-list-item">
                    <Link className="channel-link" to={"/channels/" + channel._id}>{channel.title}</Link>
                    <button className="join-button" onClick={()=>this.handleClick(channel._id)}>JOIN</button>
                </li>
            )
        });
                // <div className="channel-form-button-block">
                //     {channelForm}
                // </div>

        return (
            <div className="channel-index-container">
                <div className="channel-index-list-block">
                    <ul className="channel-index-list">
                        {channelList}
                    </ul>
                </div>
            </div>
        )
    }
}

export default ChannelIndex;