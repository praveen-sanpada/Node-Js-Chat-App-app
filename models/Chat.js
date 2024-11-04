// models/Chat.js
const { knex } = require('../config/Database');

class Chat {

    static async createUser(data) {
        return knex('chat_users').insert(data);
    }

    static async getUserById(post_data) {
        return await knex('chat_users')
            .select(
                'user_id',
                'name',
                'email',
                'status',
                knex.raw('DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") as created_at'),
                knex.raw('DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") as updated_at')
            )
            .where('user_id', post_data.user_id);
    }

    static async createMessage(data) {
        return knex('chat_messages').insert(data);
    }

    static async getMessageByMessageId(post_data) {
        return await knex('chat_messages')
            .select(
                'message_id',
                'from_user_id',
                'to_user_id',
                'message',
                'status',
                knex.raw('DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") as created_at'),
                knex.raw('DATE_FORMAT(updated_at, "%Y-%m-%d %H:%i:%s") as updated_at')
            )
            .where('message_id', post_data.message_id)
            .first();
    }

}

module.exports = Chat;
