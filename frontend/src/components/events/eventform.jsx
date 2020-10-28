import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.channel;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(type) {
        return e => {
            this.setState({
                [type]: e.currentTarget.value
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.createChannel(this.state).then(
            (action) => {
                this.props.history.push(`/channels/${action.channel.data._id}`)
                this.props.closeModal()
            }
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        placeholder="Enter your new channel's title"
                    />
                    <input type="date"
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

export default EventForm;