const mongoose = require('mongoose');
const { getNextSequenceValue } = require('../common');

const userSchema = new mongoose.Schema({
    _id: { type: Number },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    DOB: { type: String, required: true },
    role: { type: String, required: true },
    department: { type: String, required: true },
    isActive: { type: Boolean },
});

userSchema.pre('save', async function (next) {
    if (!this._id) {
        try {
            const id = await getNextSequenceValue('id'); // 'userId' should match the _id in the Sequence model
            this._id = id;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model(
    'Users', userSchema, 'Users');
