const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Users {
    constructor () {
        this.db = [];
    }

    list () {
        return this.db;
    }

    async save (record) {
            const { username, email, password } = record
            if (this.db.find(u => u.username === username)) {
                return Promise.reject(new Error(`username already taken: ${username}`))
            } else {
                const encryptedPassword = await bcrypt.hash(password, 5)
                this.db.push({ username, email, password: encryptedPassword })
                return record;
            }
    }
}

module.exports = new Users();