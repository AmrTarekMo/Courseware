/**
 * Module dependencies.
 */
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

/**
 * Controllers (route handlers).
 */
const auth = require('../routes/auth');
const users = require('../routes/users');
const courses = require('../routes/courses');
const students = require('../routes/students');
const degrees = require('../routes/degrees');
const enrollments = require('../routes/enrollments');
const graduate = require('../routes/graduate');
const error = require('../middleware/error');

module.exports = function(app){
    /**
     * Express configuration.
     */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan('tiny'))

    /**
     * Primary app routes.
     */
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/degrees', degrees);
    app.use('/api/courses', courses);
    app.use('/api/students', students);
    app.use('/api/enrollments', enrollments);
    app.use('/api/graduate', graduate);

    app.use(error);
}
