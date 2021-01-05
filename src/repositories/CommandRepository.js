const { Collection } = require("discord.js");

class CommandRepository extends Collection {
    constructor() {
        super();
        
        this.aliases = new Collection();
    }

    save(command) {
        this.set(command.name, command);
        this.aliases.set(command.name.toLowerCase(), command.name);
    }

    getByCommandName(name) {
        return this.get(this.aliases.get(name.toLowerCase()));
    }

    getAllCommands() {
        return this;
    }
}

module.exports = CommandRepository;
