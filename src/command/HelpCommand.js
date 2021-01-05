const { MessageEmbed } = require('discord.js');
const AbstractCommand = require('../dispatcher/AbstractCommand');

class HelpCommand extends AbstractCommand {
    constructor() {
        super('help', {
            aliases: ['ajuda', 'm'],
            description: 'Aqui está um tutorial de minhas funcionalidades.',
            examples: ['help warn'],
        });
    }

    run(ctx) {
        if (ctx.args[0]) {
            const command = ctx.commandRepository.getByCommandName(ctx.args[0]);

            ctx.channel.send(
                new MessageEmbed()
                    .setColor(process.env.EMBED_COLOR)
                    .setDescription(command.description)
                    .addField('Sinônimos', `- \`\`${ctx.prefix}${command.aliases.join('``,\n- ``')}\`\``)
                    .addField('Exemplos', `- \`\`${ctx.prefix}${command.examples.join('``,\n- ``')}\`\``)
            );
        }

        ctx.channel.send(
            new MessageEmbed()
                .setTitle('Listinha de comandos')
                .setDescription(`Caso queira ver a informação detalhada de algum comando, use \`\`${ctx.prefix}${this.name} <commando>\n${ctx.commandRepository.getAllCommands().map((command) => command.name).join('``, ``')}\`\``)
                .setColor(process.env.EMBED_COLOR)
        );
    }
}

module.exports = HelpCommand;
