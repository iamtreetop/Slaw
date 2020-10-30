const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    author: {
        type: String,
        // ref: 'User'
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;