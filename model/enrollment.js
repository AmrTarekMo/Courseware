const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: Number,
                required: true
            }
        }),
        required: true
    },
    degree: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                maxlength: 255,
                minlength: 5,
                trim: true
            },
            dailyEnrollmentRate: {
                type: Number,
                required: true,
                min:0,
                max:1000
            }
        }),
        required: true
    },
    EnrollmentFee: {
        type: Number,
        min: 0
    },
    isFinished: {
        type: Boolean,
        default: false
    }
});


enrollmentSchema.statics.lookup = function(studentId, degreeId) {
    return this.findOne({
      'student._id': studentId,
      'degree._id': degreeId,
    });
};

const Enrollment = mongoose.model('Enrollment',enrollmentSchema);

function validateEnrollment(enrollment){
    const schema = Joi.object({
        studentId: Joi.objectId().required(),
        degreeId: Joi.objectId().required()
    });
    return schema.validate(enrollment)
}

module.exports.Enrollment = Enrollment;
module.exports.enrollmentSchema = enrollmentSchema;
module.exports.validate = validateEnrollment;