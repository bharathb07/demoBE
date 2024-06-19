const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);


async function getNextSequenceValue(sequenceName) {
    const sequenceDoc = await Sequence.findByIdAndUpdate(
        sequenceName,
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true, useFindAndModify: false }
    );
    return sequenceDoc.sequence_value;
}

// Function to calculate number of leave days
function calculateLeaveDays(fromDate, toDate) {
    // Calculate the difference in milliseconds
    const diffTime = Math.abs(toDate - fromDate);
    // Calculate the number of days
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

module.exports = { sequenceSchema, getNextSequenceValue, calculateLeaveDays };