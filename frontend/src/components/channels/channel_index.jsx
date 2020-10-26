import React from 'react';
import { Link } from 'react-router-dom';

class ChannelIndex extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchChannels();
    }

    render(){
        let channelList = this.props.channels.map((channel, index)=>{
            return(
                <li>
                    <Link to={"/channels/" + channel.id}>{"Channel #" + index}</Link>
                </li>
            )
        });
        return (
            <div>
                <ul>
                    {channelList}
                </ul>
            </div>
        )
    }
}

export default ChannelIndex;