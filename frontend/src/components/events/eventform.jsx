import React from 'react';

class EventForm extends React.Component {
    constructor(props) {
        super(props)
        // debugger
        this.state = this.props.event;

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

        this.props.createEvent(this.state).then(
            (action) => {
                debugger
                this.setState({
                    events: [action.event.data._id]
                })
                this.props.updateChannel({events: this.state.events, id: this.props.match.params.channelId}).catch
                ((res) => console.log(res))
                this.props.history.push(`/channels/${this.props.match.params.channelId}`)
            })
    }

    render() {
        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1>Set Up Your Next Event</h1>
                <form onSubmit={this.handleSubmit}>
                        <label>Event Name
                            <input type="text"
                                value={this.state.title}
                                onChange={this.handleChange("title")}
                                placeholder="Wednesday Leg Days"
                            />
                        </label>
                        <label>Event Details
                            <textarea
                                value={this.state.description}
                                onChange={this.handleChange("description")}
                                placeholder="6:30pm at LA Fitness"
                            />
                        </label>
                        <label>Event End Date(if applicable)
                            <input type="date"
                                value={!this.state.date ? "" : this.state.date}
                                min={Date.now} onChange={this.handleChange("date")} 
                            />
                        </label>
                        <input type="submit" value="Submit" />
                </form>

            </div>
        )
    }
}

export default EventForm;