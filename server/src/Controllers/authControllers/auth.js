const jwt = require('jsonwebtoken'); //🍪
const secret = process.env.ACCESS_TOKEN_SECRET;
exports.auth = function auth (req, res) {
    const authToken = req.cookies.authToken;
    if (!authToken) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    jwt.verify(authToken, secret, (err, user) => {
        if (err) {
            console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
        }
        res.status(200).json({message: 'Authorized'});
    });

}