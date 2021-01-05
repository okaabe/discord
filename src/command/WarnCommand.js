const AbstractCommand = require('../dispatcher/AbstractCommand');
const { MessageEmbed } = require('discord.js');

class WarnCommand extends AbstractCommand {
    constructor() {
        super('warn', {
            aliases: ['aviso', 'embed'],
            examples: [
                'warn Hello World',
                'warn Aviso super importante'
            ],
            description: 'Avise os membros do grupo...',
            permissions: ['ADMINISTRATOR']
        })
    }

    run(ctx) {
        if (!ctx.args.length) {
            return ctx.channel.send(`:x: ${ctx.author.toString()}, por favor insira todos os argumentos do comando de acordo com o exemplo \`\`${ctx.prefix}${this.examples[0]}\`\``);
        }

        ctx.channel.send(
            new MessageEmbed()
                .setDescription(ctx.args.join(' '))
                .setColor(process.env.EMBED_COLOR)
        );
    }
}

module.exports = WarnCommand;
