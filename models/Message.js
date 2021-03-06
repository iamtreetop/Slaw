const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: String,
    username: String,
    time: String,
    day: String
    // eventId: { type: Schema.Types.ObjectId, ref: 'Event' }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);