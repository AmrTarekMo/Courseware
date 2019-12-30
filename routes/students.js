const express = require('express');
const { Student , validate } = require('../model/student')
const auth = require('../middleware/auth');
const validator = require('../middleware/validate')
const validateId = require('../middleware/validateObjectId');
const router = express.Router();


router.get('/', async (req,res) => {
    const students = await Student.find().sort({name: 1});
    res.send(students);
});

router.get('/:id', validateId, async (req,res) => {
    const student = await Student.findById(req.params.id);
    res.send(student);
});

router.post('/', auth, validator(validate), async (req,res) => {
    let student = new Student({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    student = await student.save()
    res.send(student);
});

router.put('/:id', auth, validateId, validator(validate), async (req,res) => {
    const student = await Student.findByIdAndUpdate(req.params.id,
        { name: req.body.name }, 
        { new: true }
    );
    if(!student)
        return res.status(404).send("Student not found");

    res.send(student)
});

module.exports = router;