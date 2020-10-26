const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateChannelInput(data) {
    let errors = {};

    data.text = validText(data.title) ? data.title : ""

    if (Validator.isEmpty(data.title)) {
        errors.text = "Title field is required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}