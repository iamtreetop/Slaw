const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateEventInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : ""
    data.description = validText(data.description) ? data.description : ""
    // data.date = validText(data.date) ? data.date : ""
    

    if (Validator.isEmpty(data.title)) {
        errors.title = "Title field is required"
    }

    if (Validator.isEmpty(data.description)) {
        errors.decription = "Description field is required"
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = "Date field is required"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}