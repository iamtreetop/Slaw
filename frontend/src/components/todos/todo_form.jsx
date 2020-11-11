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
                let newEventState = {
                    id: this.props.eventId,
                    todo: todo.data._id
                }
                this.props.updateEvent(newEventState).then(
                    (action) => {
                    }
                );
                this.props.closeModal();
            }
        )
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className="todo-form-box">
                <div>
                    <p className="create-todo-header-text">Create Todo</p>
                    <input className="create-todo-input" type="text"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        placeHolder="What's do you need todo?"
                    />
                    <input type="submit" value="Add your todo!" className="create-todo-submit" />
                </div>
            </form>
        )
    }
}

export default TodoForm;