import React from 'react';

class TodoForm extends React.Component{
    constructor(props){
        super(props)

        this.state = this.props.todo;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount(){
        this.props.fetchEvent(this.props.eventId);
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

        this.props.createTodo(this.state)
            .then((todo) => {
                //debugger
                let newEventState = {
                    id: this.props.eventId,
                    todo: todo.data._id
                }
                //debugger
                this.props.updateEvent(newEventState).then(
                    (action) => {
                        //debugger
                    }
                );
                this.props.closeModal();
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
                        placeholder="Enter title"
                    />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default TodoForm;