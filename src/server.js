// 3rd party Resources
require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

// App level middleware
app.use(express.json());

const users = [];

// Routes
app.get('/users', (req, res) => {
    res.status(200).json(users);
})

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body
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
