const { Client } = require('discord.js');

const CommandRepository = require('./repositories/CommandRepository');
const UserRepository = require('./repositories/UserRepository');
const GuildRepository = require('./repositories/GuildRepository');

const CommandDispatcher = require('./dispatcher/CommandDispatcher');

const GuildRegister = require('./register/GuildRegister');
const CommandRegister = require('./register/CommandRegister');

const client = new Client();

const commandRepository = new CommandRepository();
const userRepository = new UserRepository();
const guildRepository = new GuildRepository();

new CommandRegister(commandRepository).start();
new GuildRegister(guildRepository, client).start();

const commandDispatcher = new CommandDispatcher(
    commandRepository,
    userRepository,
    guildRepository,
    
    client,
);

commandDispatcher.start();

module.exports = client;
