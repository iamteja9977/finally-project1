import jwt from "jsonwebtoken";
import config from "config";


let private_key = config.get("PRIVATE_KEY");

function authMiddleware(req, res, next) {
    try {
        const token = req.headers['auth-token'];
        const payload = jwt.verify(token, private_key);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ "error": "Unauthorised Access" });
    }
}
export default authMiddleware;