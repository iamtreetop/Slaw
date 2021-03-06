import React from 'react';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import * as legoData from "../../legoloading.json";
import * as doneData from "../../doneloading.json";
import { merge } from 'lodash';
import './channel_form.css';


class ChannelForm extends React.Component{
    constructor(props){
        super(props)
        this.state = merge({}, this.props.channel, { loading: false, done: false })
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
        let descriptionText = "Live Chat\n"
            + "Create a new Event\n"
            + "Join other Events\n"
            + "Create channel Announcements\n"
            + "Create workout Todos";
        this.props.createEvent({title: "General", description: descriptionText})
            .then((action) => {
                this.setState({
                    events: [action.event.data._id], loading: true, done: true
                })
                let channel = new FormData();
                channel.append("id", this.props.user.id)
                channel.append("title", this.state.title)
                channel.append("events", this.state.events)
                channel.append("image", this.state.imageFile)

                this.props.createChannel(channel).then(
                (action) => {
                    this.props.updateUser({channels: action.channel.data._id, id: this.props.user.id});
                    this.props.history.push(`/channels/${action.channel.data._id}/${action.channel.data.events[0]}`)
                    this.props.fetchChannel(action.channel.data._id)
                    this.props.closeModal()
                }
            ).catch((res) => console.log(res))
        })
    }

    render(){

        let defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: legoData.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };
        let defaultOptions2 = {
            loop: false,
            autoplay: true,
            animationData: doneData.default,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        };

        let preview;
        (this.state.imageUrl) ? (preview = <img src={this.state.imageUrl} className="add-picture" />
        ) : ( preview = null)

        let display = !this.state.loading ? 
            (<form onSubmit={this.handleSubmit}>
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
                            required={true}
                        />
                    </div>

                    <div className="photo-input-box">
                        <p>Add a Channel Profile Picture</p>
                        <div className="file-input">
                            <input type="file" id="file-input-button" name="image"
                                onChange={this.handlePhotoInput}
                            />
                        </div>
                        {preview}
                    </div>
                    <button type="submit" value="Submit" className="channel-submit-button">Create your channel</button>
                </div>
            </form>)  :
        (
            <FadeIn>
                <div className="d-flex justify-content-center align-items-center">
                    <h1>creating channel</h1>
                    {!this.state.done ? (
                        <Lottie options={defaultOptions} height={120} width={120} />
                    ) : (
                            <Lottie options={defaultOptions2} height={120} width={120} />
                        )}
                </div>
            </FadeIn>
        )

        return (
            <div>
                {display}
            </div>
        )
    }
}

export default ChannelForm;