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
    members: {
        type: Array,
        default: []
    }
})

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;