import React from 'react';

class ChannelForm extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.channel;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFiles = this.handleFiles.bind(this);

    }

    handleFiles(e) {
        e.preventDefault();
        this.setState ({ imageFile: e.target.files[0] })
    }

    handleChange(type){
        return e => {
            this.setState({
                [type]: e.currentTarget.value
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();

        this.props.createEvent({title: "General", description: `Welcome to ${this.state.title}`})
            .then((action) => {
                this.setState({
                    events: [action.event.data._id]
                })
                let channel = new FormData();
                channel.append("userId", this.props.user.id)
                channel.append("title", this.state.title)
                channel.append("events", this.state.events)
                channel.append("image", this.state.imageFile)

                this.props.createChannel(channel).then(
                (action) => {
                    this.props.history.push(`/channels/${action.channel.data._id}`)
                    this.props.closeModal()
                }
            ).catch((res) => console.log(res))
        })
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="channel-form-box">
                    <input type="text"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        placeholder="Enter your new channel's title"
                    />
                    <input type="file" id="file-input" name="image" 
                    onChange={this.handleFiles}/>
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default ChannelForm;