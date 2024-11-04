const moment = require('moment-timezone');

class DateTimeHelper {

    static async formatDate(date, format) {
        if (!format) {
            format = "YYYY-MM-DD HH:mm:ss"
        }
        if (!date) {
            date = ""
        }

        if (date !== '') {
            return moment.utc(date).format(format)
        }
        else {
            return moment.utc(new Date()).format(format)
        }
    }

}

module.exports = DateTimeHelper;