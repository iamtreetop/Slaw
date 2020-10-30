import React from 'react';
import './channel_form.css'

class ChannelForm extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.channel;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.handlePhotoInput = this.handlePhotoInput.bind(this);

    }

    handlePhotoInput(e) {
        const reader = new FileReader();
        const file = e.currentTarget.files[0];
        reader.onloadend = () =>
            this.setState({ imageUrl: reader.result, imageFile: file });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            this.setState({ imageUrl: "", imageFile: null });
        }
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
        let descriptionText = "SOME FANCY DESCRIPTION"
        this.props.createEvent({title: "General", description: descriptionText})
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

                    this.props.updateUser1({channels: action.channel.data, userId: this.props.user.id});

                    this.props.history.push(`/channels/${action.channel.data._id}`)
                    this.props.closeModal()
                }
            ).catch((res) => console.log(res))
        })
    }

    render(){

        let preview;
        (this.state.imageUrl) ? (preview = <img src={this.state.imageUrl} className="add-picture" />
        ) : ( preview = null)

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="channel-form-box">
                    <div className="channel-form-header">
                        <p>Create your SLAW channel!</p>
                        <div onClick={this.props.closeModal} className="close-x">X</div>

                    </div>
                    <div className="channel-form-input-box">
                    <input type="text"
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        className="channel-form-input"
                        placeholder="Slaw Channel Title"
                    />
                    </div>

                    <div className="photo-input-box">
                        <p>Add a Channel Profile Picture</p>
                        <div className="file-input">
                            <input type="file" id="file-input" name="image" 
                            onChange={this.handlePhotoInput}
                            />
                        </div>
                        {preview}
                        <button type="submit" value="Submit" className="channel-submit-button">Create your channel</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default ChannelForm;