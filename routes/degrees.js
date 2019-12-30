const express = require('express');
const { Degree , validate } = require('../model/degree');
const validator = require('../middleware/validate');
const { Course } = require('../model/course');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/', async (req,res) => {
    const degrees = await Degree.find().sort('title');
    res.send(degrees)
});

router.get('/:id', async (req,res) => {
    const degree = await Degree.findById(req.params.id);
    res.send(degree)
});

router.post('/', auth, validator(validate), async (req,res) => {
    const course = await Course.findById(req.body.courseId);
    if(!course)
        return res.status(400).send("course Id is invalid");
    
    const degree = new Degree({
        title: req.body.title,
        course: {
            _id: course._id,
            name: course.name
        },
        availSeats: req.body.availSeats,
        dailyEnrollmentRate: req.body.dailyEnrollmentRate
    });
    await degree.save();
    
    res.send(degree)
});

module.exports = router;