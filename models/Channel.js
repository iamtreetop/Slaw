const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({

    admin: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }, 

    channelPicture: {
        type: String,
        default: ""
    },

    members: {
        type: [{ type: Schema.Types.ObjectId, ref:'User' }],
    }
})

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;