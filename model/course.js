const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const courseSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  }  
});

const Course = mongoose.model('Course',courseSchema);

function validateCourse(course){
  const schema = Joi.object({
      name: Joi.string().min(3).required()
  });
  return schema.validate(course);  
}

module.exports.Course = Course;
module.exports.courseSchema = courseSchema;
module.exports.validate = validateCourse;