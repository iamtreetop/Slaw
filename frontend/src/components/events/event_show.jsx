import React from "react";

class EventShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchEvent(this.props.eventId).then( (action) => {
                //debugger
                this.setState(action.event.data);
            }
        );
    }

    render() {

        if(!this.state){
            return null;
        }

        return (
            <div>
                <h1>Welcome to {this.state.title}</h1>
                <h2>{this.state.description}</h2>
                <button onClick={() => this.props.openModal('todo',this.props.eventId)}>Create New Todo</button>
            </div>
        )
    }
}

export default EventShow;