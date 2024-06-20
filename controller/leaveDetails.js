const { calculateLeaveDays } = require('../common');
const LeaveModel = require('../models/leaveDetails');
const usersModels = require("../models/student");

const applyLeave = (req, res) => {
    const leaveId = req.body.userId;
    const reason = req.body.reason;
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);

    // Calculate the number of leave days
    const leaveDays = calculateLeaveDays(fromDate, toDate);


    LeaveModel.findById(leaveId, function (err, leave) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error finding leave record");
        }

        if (!leave) {
            return res.status(404).send("Leave record not found");
        }

        // Check if totalLeave is sufficient for requested leave
        if (leave.totalLeave < leaveDays) {
            return res.status(400).send("Insufficient total leave balance");
        }
        if (leave.leaveTaken >= leave.totalLeave) {
            return res.status(400).send("Insufficient leave balance");
        }

        // Check additional business rules, if any (e.g., max leave days per request)
        const maxAllowedLeaveDays = 3; // Example: Max 3 days allowed per leave request
        if (leaveDays > maxAllowedLeaveDays) {
            return res.status(400).send(`Leave request exceeds maximum allowed days (${maxAllowedLeaveDays})`);
        }


        // Update leave details
        leave.reason = reason;
        leave.fromDate = fromDate;
        leave.toDate = toDate;
        leave.leaveTaken += leaveDays; // Increment leaveTaken by number of leave days
        leave.totalLeave -= leaveDays; // Decrease totalLeave by number of leave days
        leave.isApproved = false;
        leave.isActive = true;

        // Save updated leave document
        leave.save(function (err, savedLeave) {
            if (err) {
                console.log(err);
                return res.status(500).send("Error updating leave details");
            }

            console.log("Leave record updated successfully:", savedLeave);
            res.send(savedLeave);
        });
    });

};

const leaveApprove = (req, res) => {
    usersModels.findById(req.body.userId, function (err, usersDate) {
        console.log(usersDate, "usersDate");
        if (usersDate.role === "admin") {
            LeaveModel.findById(req.body.id, function (err, approveData) {
                approveData.isApproved = true;
                approveData.save(function (err, savedLeave) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error updating leave details");
                    }

                    console.log("Approved successfully", savedLeave);
                    res.send(savedLeave);
                });
            })
        } else {
            console.log("you not have access");
            res.status(401).send("you don't have access");
        }
    })
}

const getUsersLeaveDetails = (req, res) => {
    LeaveModel.findById(req.body.userId,
        function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(data);
            }
        });
}


module.exports = { applyLeave, leaveApprove, getUsersLeaveDetails };
