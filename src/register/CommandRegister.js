const HelpCommand = require("../command/HelpCommand");
const WarnCommand = require("../command/WarnCommand");

class CommandRegister {
    constructor(commandRepository) {
        this.commandRepository = commandRepository;
    }

    start() {
        this.commandRepository.save(new HelpCommand());
        this.commandRepository.save(new WarnCommand());
    }
}

module.exports = CommandRegister;
