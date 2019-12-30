const {User} = require('../../../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: './.env.test'});
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a Valid JWT', () => {
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(),
            isAdmin: true
        }
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, process.env.JWT_PASS_KEY);
        
        expect(decoded).toMatchObject(payload);
    })
})