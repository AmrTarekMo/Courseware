const express = require('express');
const { Course, validate } = require('../model/course');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId');
const validator = require('../middleware/validate');
const router = express.Router();


router.get('/', async (req,res) => {
    const courses = await Course.find().sort('name');
    res.send(courses)
});

router.get('/:id', validateObjectId, async (req,res) => {
    const course = await Course.findById(req.params.id);
    
    if (!course)
        return res.status(404).send("there is no course with that id");
    
    res.status(200).send(course) 
});

router.post('/', auth, validator(validate), async (req,res) => {
    let course = new Course({ name: req.body.name });
    course = await course.save();
    res.send(course) 
});

router.put('/:id', [auth, admin,validator(validate)], async (req,res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true });
    if(!course)
        return res.status(404).send("course not found");

    res.send(course)
});

router.delete('/:id', [auth, admin], async (req,res) => { 
    const course = await Course.findByIdAndRemove(req.params.id);

    if(!course)
        return res.status(404).send("course not found");

    res.send(course)
});

module.exports = router;