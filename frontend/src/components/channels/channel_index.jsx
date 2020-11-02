import React from 'react';
import './channel_index.css'

class ChannelIndex extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            query: "",
            notJoinedChannels: [],
            filteredChannels: [],
            searchSubmitted: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){
        this.props.fetchChannels().then(
            (action) => {
                this.props.fetchUser(this.props.user.id).then(
                    (action) => {
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
        
                        this.setState({
                            notJoinedChannels: notJoined
                        });
                    }
                )
            }
        );
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
                members: this.props.user._id
            }
    
            
            this.props.updateChannel(newMembers).then( (action)=>{
        
                
                this.props.history.push(`/channels/${action.channel.data._id}/${action.channel.data.events[0]._id}`);
            })
        });
    }

    handleSearch(e){
        e.preventDefault();

        let filteredChannelsList = this.state.notJoinedChannels.filter( (channel)=>(channel.title.toLowerCase().includes(this.state.query.toLowerCase())) );

        this.setState({
            filteredChannels: filteredChannelsList,
            searchSubmitted: true
        })
    }

    handleChange(type){
        return e => {
            this.setState({
                [type]: e.currentTarget.value
            })
        }
    }



    render(){

        if(this.props.channels.length === 0 || Object.keys(this.props.user).length === 0) {
            return null;
        }

        return (
            <div className="channel-index-bg-image">

                <div className="channel-index-container">
                    <div className="channel-index-list-block">
                        <form className="channel-search-container" onSubmit={this.handleSearch}>
                            <input className="channel-search-bar" type="text" placeholder="Search channels" value={this.state.query} onChange={this.handleChange("query")}/>
                            <input className="channel-search-button" type="submit" value="Search"/>
                        </form>
                        <ul className="channel-index-list">
                            {
                                this.state.searchSubmitted ? this.state.filteredChannels.map(
                                    (channel, index) => {
                                        return (
                                            <li key={index} className="channel-list-item">
                                                <img src={channel.channelPicture} className="channel-link" alt="" />
                                                <span className="channel-link-text" >{channel.title}</span>
                                                <button className="join-button" onClick={()=>this.handleClick(channel._id)}>JOIN</button>
                                            </li>
                                        )
                                    }
                                ): this.state.notJoinedChannels.map(
                                    (channel, index) => {
                                        return (
                                            <li key={index} className="channel-list-item">
                                                <img src={channel.channelPicture} className="channel-link" alt="" />
                                                <span className="channel-link-text" >{channel.title}</span>
                                                <button className="join-button" onClick={()=>this.handleClick(channel._id)}>JOIN</button>
                                            </li>
                                        )
                                    }
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChannelIndex;