require('dotenv/config');

const app = require('./app');

app.login(process.env.DISCORD_TOKEN);
