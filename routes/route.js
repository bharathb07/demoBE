const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('../models/student');

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

router.get('/save', function (req, res) {
    const newStudent = new StudentModel({
        StudentId: 101,
        Name: "Sam", Roll: 1
    });

    newStudent.save().then(function (data) {
        console.log(data);
        res.send(data);
    }).catch(function (err) {
        console.log(err);
    })
});

router.get('/list', function (req, res) {
    StudentModel.find()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});

module.exports = router;