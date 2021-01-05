const CommandContext = require("./CommandContext");

/**
 * @class CommandDispatcher
 * 
 * Class to handle the command dispatch, and for this it receives the repositories and the discordClient to have the acess of
 * the discord api events.
 */
class CommandDispatcher {
    constructor(
        commandRepository,
        userRepository,
        guildRepository,
        discordClient,
    ) {
        this.commandRepository = commandRepository;
        this.userRepository = userRepository;
        this.guildRepository = guildRepository;

        this.discordClient = discordClient;
    }

    start() {
        if (!process.env.DISCORD_PREFIX) {
            throw new Error('Please insert a prefix in .env file!');
        }

        this.discordClient.on('message', (message) => this._dispatch(message));
        this.discordClient.on('messageUpdate', (_, message) => this._dispatch(message));
    }

    _targetHasPermissionToExecute(member, permissions) {
        return !permissions.some((permission) => !member.hasPermission(permission));
    }

    _dispatch(message) {
        if (
            !message.content.startsWith(process.env.DISCORD_PREFIX)
            || message.author.bot
            || message.channel.type !== 'text'
        ) {
            return;
        }

        const [name, ...args] = message
            .content
            .slice(process.env.DISCORD_PREFIX.length)
            .split(/ +/g);

        const command = this.commandRepository
            .getByCommandName(name);
        
        if (!command) {
            message.channel.send('Eu ainda não possuo essa funcionalidade.');
            return;
        }

        if (!this._targetHasPermissionToExecute(message.member, command.permissions)) {
            message.channel.send(`Você não tem permissão para usar essa minha funcionalidade, aqui está as permissões necessarias para o mesmo: \`\`${command.permissions.join('``, ``')}\`\``);
            return;
        }

        if (!this._targetHasPermissionToExecute(message.guild.me, command.permissions)) {
            message.channel.send(`Eu não consigo fazer isso, eu preciso das seguintes permissões: \`\`${command.permissions.join('``, ``')}\`\``);
            return;
        }

        command.run(new CommandContext(
            this.discordClient,
            message,
            args,
            process.env.DISCORD_PREFIX,

            this.commandRepository,
            this.userRepository,
            this.guildRepository
        ));
    }

}

module.exports = CommandDispatcher;
