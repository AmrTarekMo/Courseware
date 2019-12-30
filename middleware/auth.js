const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    const token = req.header('X-Auth-Token');
    if(!token)
        return res.status(401).send("Access denied. No token provided.");
    
    try {
        req.user = jwt.verify(token, process.env.JWT_PASS_KEY);
        next();
    } catch (error) {
        res.status(400).send("Invalid token.");
    }
};