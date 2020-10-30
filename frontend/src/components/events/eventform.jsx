import React from 'react';
import './event_form.css'

class EventForm extends React.Component {
    constructor(props) {
        super(props)
        // debugger
        this.state = this.props.event;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        if (this.props.formType === "edit") {
            this.props.fetchEvent(this.props.match.params.eventId)
        }
        this.setState({ participants: [this.props.userId] })
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
        if (this.props.formType === "create") {
            this.setState({ participants: [this.props.userId] })
            this.props.createEvent(this.state).then(
                (action) => {
                    // debugger
                    this.setState({
                        events: [action.event.data._id]
                    })
                    this.props.updateChannel({events: this.state.events, id: this.props.match.params.channelId}).catch
                    ((res) => console.log(res))
                    this.props.history.push(`/channels/${this.props.match.params.channelId}/${this.state.events}`)
                })
        }
        else{
            this.props.updateEvent(this.state).then(
                (action) => {
                    this.props.history.push(`/channels/${this.props.match.params.channelId}/${this.props.match.params.eventId}`)
                }).catch
                ((res) => console.log(res))
        }
    }

    render() {
        let heading = this.props.formType === "create" ? "Set Up Your Next Event" : "Edit Your Event"
        return (
            <div className="event-bg-image">
                <div className="event-form-container">
                    <form className="event-form" onSubmit={this.handleSubmit}>
                            <h1>{heading}</h1>
                            <label>Event Name<br/>
                                <input className="event-text-field" 
                                    type="text"
                                    value={this.state.title}
                                    onChange={this.handleChange("title")}
                                    placeholder="Wednesday Leg Days"
                                    required={true}
                                />
                            </label>
                        <br/>
                            <label>Event Details<br/>
                                <textarea
                                    value={this.state.description}
                                    onChange={this.handleChange("description")}
                                    placeholder="6:30pm at LA Fitness"
                                    required={true}
                                />
                            </label>
                        <br/>
                            <label>Event End Date (if applicable)<br/>
                                <input type="date"
                                    value={!this.state.date ? "" : this.state.date}
                                    min={Date.now} onChange={this.handleChange("date")} 
                                />
                            </label>
                        <br/>
                            <input className="submit-event-btn" type="submit" value="Submit" />
                    </form>

                </div>
            </div>
        )
    }
}

export default EventForm;