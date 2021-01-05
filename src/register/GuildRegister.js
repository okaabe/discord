const Guild = require("../entities/Guild");

class GuildRegister {
    constructor(
        guildRepository,
        discordClient
    ) {
        this.guildRepository = guildRepository;
        this.discordClient = discordClient;
    }

    start() {
        this.discordClient.on('guildCreate', (guild) => {
            this.guildRepository.save(new Guild(guild.id)).catch((err) => {
                console.log(`It wasnt possible save the guild in the database, guild id ${guild.id}`);
            });
        })

        this.discordClient.on('guildDelete', (guild) => {
            this.guildRepository.getGuildByDiscordId(guild.id).then((guild) => {
                if (guild && guild.isBanned) {
                    return;
                }

                this.guildRepository.deleteById(guild.id).catch((err) => {
                    console.log(`It wasnt possible remove the guild ${guild.id} of the database, guild id ${guild.id}`);
                });
            }).catch((err) => {
                console.log('It wasnt possible get the guild in the database for check if i may delete');
            });
        })
    }
}

module.exports = GuildRegister;
