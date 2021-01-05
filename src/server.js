require('dotenv/config');

const { connect } = require('mongoose');
const app = require('./app');


connect(process.env.MONGODB_URIS, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, (err) => {
    if (err) {
        throw err;
    }

    console.log('Database connected');
    app.login(process.env.DISCORD_TOKEN).then(() => {
        console.log('Discord connected');
    });
});
