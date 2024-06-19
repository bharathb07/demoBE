const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { getUsers, createUsers, deleteUsers } = require('../controller/users');
const { applyLeave, leaveApprove, getUsersLeaveDetails } = require('../controller/leaveDetails');

// Connecting to database
const query = 'mongodb+srv://bharathmspbk:Ki2IfzBTQJVbHAyT@cluster0.ygplqj9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

router.post('/admin/create', createUsers);
router.get('/admin/list', getUsers);
router.post('/admin/delete', deleteUsers);


router.post('/leaveApply', applyLeave);
router.post('/admin/approve', leaveApprove);
router.post('/getLeaveDetails', getUsersLeaveDetails);
module.exports = router;