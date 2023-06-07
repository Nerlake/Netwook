const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'netwook_secret_key');
        req.id = decodedToken.user._id;
        req.isAdmin = decodedToken.user.isAdmin;

        next();
    } catch (error) {
        res.status(401).json('Requête non authentifiée !');
    }
};