class CommandContext {
    constructor(
        client,
        message,
        args,
        prefix,

        commandRepository,
        userRepository,
        guildRepository,
    ) {
        this.client = client;
        this.message = message;
        this.args = args;
        this.prefix = prefix;

        this.channel = this.message.channel;

        this.commandRepository = commandRepository;
        this.userRepository = userRepository;
        this.guildRepository = guildRepository;
    }
}

module.exports = CommandContext;
