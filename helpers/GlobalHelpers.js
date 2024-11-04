class GlobalHelpers {

    static async responseMessage(service_name, message, error, data, response_code) {
        const response = {
            service_name: service_name,
            message: message,
            error: error,
            data: data,
            response_code: response_code,
        };
        return response;
    }

    static async emptyValidator(value) {
        let check_data = false
        if (value == undefined || value == null || value == '') {
            check_data = true
        }
        return check_data;
    }

}

module.exports = GlobalHelpers;
