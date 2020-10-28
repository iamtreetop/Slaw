import React from 'react';

class TodoForm extends React.Component{
    constructor(props){
        super(props)

        this.state = this.props.todo;

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

        this.props.createTodo(this.state)
            .then((todo) => {
                //debugger
                let newEventState = {
                    id: this.props.eventId,
                    todo: todo.data._id
                }
                //debugger
                this.props.updateEvent(newEventState);
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
                        placeholder="Enter your new todo's title"
                    />
                    <input type="text"
                        value={this.state.description}
                        onChange={this.handleChange("description")}
                        placeholder="Enter your new todo's description"
                    />
                    <input type="submit" value="Submit" />
                </div>
            </form>
        )
    }
}

export default TodoForm;