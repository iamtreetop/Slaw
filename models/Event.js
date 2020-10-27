const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
    },
    // timestamps: true
})

module.exports = Event = mongoose.model("Event", EventSchema);