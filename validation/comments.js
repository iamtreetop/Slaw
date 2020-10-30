const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.comment = validText(data.comment) ? data.comment : ""

    if (Validator.isEmpty(data.comment)) {
        errors.comment = "Comment field is required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}