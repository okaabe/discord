const { model, Schema } = require("mongoose");

class GuildRepository {
    constructor() {
        this.collection = model("Guild", new Schema({
            discordId: { type: String, required: true, unique: true },
        }));
    }

    save(guild) {
        return this.collection.create(guild);
    }

    getGuildByDiscordId(id) {
        return this.collection.findOne({ discordId: id });
    }
}

module.exports = GuildRepository;
