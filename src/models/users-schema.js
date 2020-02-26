const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String, required: true, default: 'user', enum: ['admin', 'user'] }
})

usersSchema.methods.generateToken = () => {
    return jwt.sign({ username: this.username, email: this.email }, process.env.SECRET)
}

usersSchema.static.authenticateBasic = (username, password) => {
    //do findOne query with mongoose to get the right user
}
module.exports = mongoose.model('User', usersSchema);