const { model, Schema } = require('mongoose');

class UserRepository {
    constructor() {
        this.collection = model("User", new Schema({
            discordId: { type: String, unique: true, required: true },
        }));
    }

    save(user) {
        this.collection.create(user);
    }

    getByDiscordId(id) {
        return this.collection.findOne({ discordId: id });
    }
}

module.exports = UserRepository;
