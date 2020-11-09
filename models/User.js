const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  handle: {
    type: String,
    required: true,
    unique: true
  },
  channels: {
    type: [{ type: Schema.Types.ObjectId, ref:'Channel' }],
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // zipcode: {
  //   type: Number,
  //   required: true,
  // },
  date: {
      type: Date,
      default: Date.now
  }
}, {
  timestamps: true
});

module.exports = User = mongoose.model('User', UserSchema);