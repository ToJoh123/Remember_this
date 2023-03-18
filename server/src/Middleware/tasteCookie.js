const jwt = require('jsonwebtoken');
const secret = process.env.ACCESS_TOKEN_SECRET;

exports.tasteCookie = function tasteCookie (req, res, next) {
    const authKey = req.cookies.authToken;
    if (!authKey || authKey === '') {
        return res.status(401).json({message: 'Unauthorized'});
    }
    const loggedInUser = jwt.verify(authKey, secret);
    
    if(!loggedInUser) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    // if jwt expired
    if (loggedInUser.exp < Date.now() / 1000) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    // if (err){
    //     console.log(err);
    // }
    req.loggedInUser = loggedInUser;
    next();
}
