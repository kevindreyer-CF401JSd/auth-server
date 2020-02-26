const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const usersSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     email: { type: String },
//     role: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
// })

// usersSchema.methods.generateToken = () => {
//     return jwt.sign({ username: this.username, email: this.email }, process.env.SECRET)
// }

// usersSchema.static.authenticateBasic = (username, password) => {
//     //do findOne query with mongoose to get the right user
// }
// module.exports = mongoose.model('User', userSchema);

class Users {
    constructor () {
        this.db = [];
        this.SECRET = "testtesttest"
    }

    list () {
        return this.db;
    }

    generateToken (user) {
        return jwt.sign({ username: user.username, email: user.email }, 
            this.SECRET
        )
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

    async authenticateBasic (username, password) {
        const user = (this.db.find(u => u.username === username))
        if (!user) {
            return Promise.reject(new Error('user does not exist'))
        } else {
            const valid = await bcrypt.compare(password, user.password)
                if (valid) {
                    return user
                } else {
                    return Promise.reject(new Error('wrong password'))
                }
        }
    }
}

module.exports = new Users();