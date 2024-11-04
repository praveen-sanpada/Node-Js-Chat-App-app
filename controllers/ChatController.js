// controllers/ChatController.js
const Chat = require('../models/Chat');
const GlobalHelpers = require('../helpers/GlobalHelpers');
const DateTimeHelper = require('../helpers/DateTimeHelper');


class ChatController {

    async createUser(req, res) {
        let response = {};
        try {
            const post_data = req.body;
            if (await GlobalHelpers.emptyValidator(post_data.name)) {
                response = await GlobalHelpers.responseMessage("api/add_user", "Name is required.", [], {}, 500);
                return res.status(500).json(response);
            }
            if (await GlobalHelpers.emptyValidator(post_data.email)) {
                response = await GlobalHelpers.responseMessage("api/add_user", "Email is required.", [], {}, 500);
                return res.status(500).json(response);
            }

            let insert_user = {
                name: post_data.name,
                email: post_data.email,
                status: 1,
                created_at: await DateTimeHelper.formatDate("", ""),
                updated_at: await DateTimeHelper.formatDate("", "")
            };
            await Chat.createUser(insert_user);

            response = await GlobalHelpers.responseMessage("api/add_user", "User added successfully.", [], {}, 200);
            return res.status(201).json(response);
        } catch (error) {
            response = await GlobalHelpers.responseMessage("api/add_user", "Please check the error.", error.message, {}, 500);
            return res.status(500).json(response);
        }
    }

    async getUserById(req, res) {
        let response = {};
        try {
            const post_data = req.body;
            if (await GlobalHelpers.emptyValidator(post_data.user_id)) {
                response = await GlobalHelpers.responseMessage("api/get_user", "User id is required.", [], {}, 500);
                return res.status(500).json(response);
            }

            let user = await Chat.getUserById(post_data);

            response = await GlobalHelpers.responseMessage("api/get_user", "", [], user, 200);
            return res.status(201).json(response);
        } catch (error) {
            response = await GlobalHelpers.responseMessage("api/get_user", "Please check the error.", error.message, {}, 500);
            return res.status(500).json(response);
        }
    }

    async createMessage(req, res) {
        let response = {};
        try {
            const post_data = req.body;
            if (await GlobalHelpers.emptyValidator(post_data.from_user_id)) {
                response = await GlobalHelpers.responseMessage("api/add_message", "From user id is required.", [], {}, 500);
                return res.status(500).json(response);
            }
            if (await GlobalHelpers.emptyValidator(post_data.to_user_id)) {
                response = await GlobalHelpers.responseMessage("api/add_message", "To user id is required.", [], {}, 500);
                return res.status(500).json(response);
            }
            if (await GlobalHelpers.emptyValidator(post_data.message)) {
                response = await GlobalHelpers.responseMessage("api/add_message", "Message is required.", [], {}, 500);
                return res.status(500).json(response);
            }

            let insert_message = {
                from_user_id: post_data.from_user_id,
                to_user_id: post_data.to_user_id,
                message: post_data.message,
                status: 1,
                created_at: await DateTimeHelper.formatDate("", ""),
                updated_at: await DateTimeHelper.formatDate("", "")
            };
            let message_id = (await Chat.createMessage(insert_message))[0];
            post_data.message_id = message_id;
            let message = await Chat.getMessageByMessageId(post_data);

            // const room = `user_chat_${post_data.from_user_id}`;
            // io.to(room).emit('new_message', message);

            response = await GlobalHelpers.responseMessage("api/add_message", "Message added successfully.", [], {}, 200);
            return res.status(201).json(response);
        } catch (error) {
            response = await GlobalHelpers.responseMessage("api/add_message", "Please check the error.", error.message, {}, 500);
            return res.status(500).json(response);
        }
    }

}

module.exports = new ChatController();
