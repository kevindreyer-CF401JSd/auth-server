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

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    if (users.find(u => u.username === username)) {
        res.status(403).json({ error: `Username already taken: ${username}` })
    } else {
        users.push({ username, email, password: await bcrypt.hash(password, 4) })
        res.status(200).json({ message: 'success' })
    }
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
