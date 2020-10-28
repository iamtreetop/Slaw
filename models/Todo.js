const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;