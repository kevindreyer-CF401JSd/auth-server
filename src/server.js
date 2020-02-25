// 3rd party Resources
require('dotenv').config();
const express = require('express');

const app = express();

// App level middleware
app.use(express.json());

const users = require('./models/users');

// Routes
app.get('/users', (req, res) => {
    res.status(200).json(users.list());
})

app.post('/signup', async (req, res) => {
    users.save(req.body)
        .then(() => res.status(200).json({ message: 'success' }))
        .catch(err => res.status(403).json({ error: err.message }))
})

//Server setup and startup
let isRunning = false;

module.exports = {
    server: app,
    start: function (port) {
        if (!isRunning) {
            isRunning = true;
            app.listen(port);
            console.log(`Listening on port ${port}...`);
        } else {
            console.error('Server is already running!');
        }
    }
}
