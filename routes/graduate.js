const express = require('express');
const Joi = require('@hapi/joi');
const { Enrollment } = require('../model/enrollment');
const { Degree } = require('../model/degree');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const router = express.Router();


router.post('/', auth, validate(validateGraduate), async (req,res) => {
    let enroll = await Enrollment.lookup(req.body.studentId,req.body.degreeId);
    if (!enroll) 
        return res.status(404).send('Enroll not found.');
    if(enroll.isFinished === true)
        return res.status(400).send('Student already graduated..');

    enroll.isFinished = true;
    await enroll.save();
    
    await Degree.update({ _id: enroll.degree._id }, {
        $inc: { availSeats: 1 }
      });
        
    res.send(`Congratulation ${enroll.student.name} for graduating in ${enroll.degree.title}..`);

});

function validateGraduate(graduation){
    const schema = Joi.object({
        studentId: Joi.objectId().required(),
        degreeId: Joi.objectId().required()
    })
    return schema.validate(graduation)
}

module.exports = router;

