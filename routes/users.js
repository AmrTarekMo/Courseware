const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');
const { User , validate } = require('../model/user');
const validator = require('../middleware/validate');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user); 
});

router.post('/', validator(validate), async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if(user)
        return res.status(400).send("User already registered");
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword    
    });
    await user.save();
    
    const token = user.generateAuthToken();
    res.header('X-Auth-Token',token).send({
        name: user.name,
        email: user.email
    });
});

module.exports = router;