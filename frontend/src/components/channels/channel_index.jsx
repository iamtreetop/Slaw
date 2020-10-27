import React from 'react';
import { Link } from 'react-router-dom';
import SideBarContainer from "../sidebar/sidebar_container"

class ChannelIndex extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.fetchChannels();
    }

    handleClick(channelId){
        //debugger
        
        let newMembers = {
            id: channelId,
            members: this.props.userId
        }

        this.props.updateChannel(newMembers).then( (action)=>{
            //this.props.history.push(`/channels/${action.channel._id}`)
        })
    }

    render(){
        if(!this.props.channels){
            return null;
        }

        const channelForm = (
            <button onClick={() => this.props.openModal('channel')}
                className="channel-form">Create a channel</button>
        );
        
        let channelList = this.props.channels.map((channel, index)=>{
            return(
                <li>
                    <Link to={"/channels/" + channel._id}>{channel.title}</Link>
                    <button onClick={()=>this.handleClick(channel._id)}>JOIN</button>
                </li>
            )
        });
        return (
            <div>
                <ul>
                    {channelForm}
                    {channelList}

                    <SideBarContainer />
                </ul>
            </div>
        )
    }
}

export default ChannelIndex;