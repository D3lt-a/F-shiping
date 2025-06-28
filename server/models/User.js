const mongoose = require('mongoose');
const brcypt = require('bcrypt');
const { type } = require('os');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
    }
})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await brcypt.genSalt(10);
        this.password = await brcypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (inputPass) {
    return await brcypt.compare(inputPass, this.password);
};

module.exports = mongoose.model('User', UserSchema);