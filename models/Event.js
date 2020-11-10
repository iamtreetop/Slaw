const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    description: {
        type: String,
    },
    participants: {
        type: [{type: Schema.Types.ObjectId, ref:'User'}]
    },
    todo: {
        type: [{type: Schema.Types.ObjectId, ref:'Todo'}]

    },
    comments: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]

    }
})

module.exports = Event = mongoose.model("Event", EventSchema);