const mongoose = require('mongoose');
const { getNextSequenceValue } = require('../common');

const leaveSchema = new mongoose.Schema({
    _id: { type: Number },
    userId: { type: Number },
    totalLeave: { type: Number, required: true },
    leaveTaken: { type: Number, required: true },
    reason: { type: String, required: true },
    isActive: { type: Boolean },
    fromDate: { type: String },
    toDate: { type: String },
    isApproved: { type: Boolean }

});

leaveSchema.pre('save', async function (next) {
    if (!this._id && !this.userId) {
        try {
            const id = await getNextSequenceValue('userId'); // 'userId' should match the _id in the Sequence model
            this._id = id;
            this.userId = id;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});


module.exports = mongoose.model(
    'LeaveDetails', leaveSchema, 'LeaveDetails');
