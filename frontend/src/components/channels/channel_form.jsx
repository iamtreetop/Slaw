import React from 'react';

class ChannelForm extends React.Component{
    constructor(props){
        super(props)

        this.state = this.props.channel;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

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
        // this.props.createEvent({title: "General", description: `Welcome to ${this.state.title}`})
        //     .then((action) => {
        //         debugger
        //         this.props.createChannel({admin: this.state.admin, date: this.state.date, title: this.state.title, members: this.state.members, events: [action.id]})
        //         .then((action) => {
        //                 debugger
        //                 this.props.history.push(`/channels/${action.channel.data._id}`)
        //                 this.props.closeModal()
        //         })
        //     })
        this.props.createChannel(this.state).then(
            (action) => {
                debugger
                this.props.history.push(`/channels/${action.data.channel.data._id}`)
                this.props.closeModal()
            }
        )
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        placeholder="Enter your new channel's title"
                    />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default ChannelForm;