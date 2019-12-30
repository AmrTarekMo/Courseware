const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const { courseSchema } = require('./course');

const degreeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 255
    },
    course: {
        type: courseSchema,
        required: true
    },
    availSeats: {
        type: Number,
        required:true,
        min: 0,
        max: 1000
    },
    dailyEnrollmentRate: {
        type: Number,
        required: true,
        min:0,
        max:1000
    }
});

const Degree = mongoose.model('Degree',degreeSchema);

function validateDegree(degree){
    const schema = Joi.object({
        title: Joi.String().min(5).max(255).required(),
        courseId: Joi.objectId().required(),
        availSeats: Joi.number().min(0).max(1000).required(),
        dailyEnrollmentRate: Joi.number().min(0).max(1000).required()
    });
    return schema.validate(degree)
}

module.exports.Degree = Degree;
module.exports.validate = validateDegree;