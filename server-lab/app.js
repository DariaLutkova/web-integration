const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./router/auth'));
app.use('/api/link', require('./router/links'));
app.use('/t/', require('./router/redirects'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        app.listen(PORT, () => {
            console.log('APP HAS BEEN STARTED! Port number: ' + PORT)
        });
    } catch (err) {
        console.error('Server error', err.message);
        process.exit(1);
    }
}

start();