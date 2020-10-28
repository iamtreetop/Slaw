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
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    participants: {
        type: [{type: Schema.Types.ObjectId, ref:'User'}]
    },
    todo: {
        type: [{type: Schema.Types.ObjectId, ref:'Todo'}]
        // type: [{ type: Schema.Types.ObjectId, ref:'todos' }]
        // type: Schema.Types.ObjectId, 
        // ref:'Todo' 
        // type: [{ type: Schema.Types.ObjectId, ref:'Todo' }]
        // type: Array,
        // default: []
    }
    // timestamps: true
})

module.exports = Event = mongoose.model("Event", EventSchema);