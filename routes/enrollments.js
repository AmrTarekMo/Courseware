const { Enrollment , validate } = require('../model/enrollment');
const { Degree } = require('../model/degree');
const { Student } = require('../model/student')
const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const validateId = require('../middleware/validateObjectId')
const validator = require('../middleware/validate')
const auth = require('../middleware/auth');
const router = express.Router();


Fawn.init(mongoose);

router.get('/:id', validateId, async (req,res) => {
    const enrollment = await Enrollment.find().sort('degree');
    
    res.send(enrollment)
});

router.post('/', auth, validator(validate), async (req,res) => {
    const student = await Student.findById(req.body.studentId);
    const degree = await Degree.findById(req.body.degreeId);
    if(!student || !degree)
        return res.status(400).send("error no student or degree")

    if(degree.availSeats === 0)
        return res.status(400).send("cant enroll");
    
    let enroll = new Enrollment({
        student: {
            _id: student._id,
            name: student.name,
            phone: student.phone
        },
        degree: {
            _id: degree._id,
            title: degree.title,
            dailyEnrollmentRate: degree.dailyEnrollmentRate,
        }
    });
    try{
        new Fawn.Task()
            .save('enrollments', enroll)
            .update('degrees',{_id: degree._id},{
                $inc: {availSeats: -1}
            })
            .run();
        
        res.send(enroll)
    }
    catch(ex){
        res.status(500).send('something went wrong');
    }

});

module.exports = router;

