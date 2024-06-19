const usersModels = require("../models/student");
const leaveModels = require("../models/leaveDetails");
const createUsers = (req, res) => {
    const userDetails = new usersModels();
    userDetails.userName = req.body.userName;
    userDetails.email = req.body.email;
    userDetails.DOB = req.body.DOB;
    userDetails.role = req.body.role;
    userDetails.department = req.body.department;
    userDetails.isActive = true;

    userDetails.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            const leaveDetails = new leaveModels({
                totalLeave: 18,
                leaveTaken: 0,
                reason: "N/A",
                isApproved: false,
                isActive: true,
            });
            leaveDetails.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.send("Data inserted");
        }
    });
}

const getUsers = (req, res) => {
    usersModels.find()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            console.log(err);
        });

}

const deleteUsers = (req, res) => {
    usersModels.findByIdAndDelete((req.body.id),
        function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
                console.log("Data Deleted!");
            }
        });
}

module.exports = { createUsers, getUsers, deleteUsers };