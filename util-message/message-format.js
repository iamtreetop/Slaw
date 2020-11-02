const moment = require('moment')

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment(0).format('h:mm:a')
    }
};

module.exports = formatMessage;

