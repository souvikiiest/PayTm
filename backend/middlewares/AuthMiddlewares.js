
const jwt = require("jsonwebtoken")
const JWT_SECRET =require("../config"); 
 function AuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(403).send("Token must start with Bearer");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (decoded.userID) {
            req.userID = decoded.userID;
            next();
        }
    }
    catch (err) {
        return res.status(411).send("ailed to verify jwt");
    }
}
module.exports={AuthMiddleware}

