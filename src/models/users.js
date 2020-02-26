// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Model = require('./mongo-model');
const schema = require('./users-schema');

class Users extends Model{
    constructor () {
        super(schema)
        this.db = [];
        this.SECRET = process.env.SECRET
    }

    list () {
        return this.db;
    }

    getAll (id) {
        const queryObject = id ? { _id: id } : {};
        return this.schema.find(queryObject);
    }

    create (record) {
        const newRecord = new this.schema(record);
        return newRecord.save();
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
                const newRecord = new this.schema(record);
                return newRecord.save()
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