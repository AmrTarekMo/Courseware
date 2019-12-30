const mongoose = require('mongoose');
const Joi = require('@hapi/joi')

const studentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Student = mongoose.model('Student',studentSchema);

function validateStudent(student){
    const schema = Joi.object({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        isGold: Joi.boolean()
    });
    return schema.validate(student)
}


module.exports.Student = Student;
module.exports.validate = validateStudent; 