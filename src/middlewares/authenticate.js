const jwt = require("jsonwebtoken");
const userService = require("../services/user-service");

const authenticate = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ message: "unauthenticated" });
        }

        if (!authorization.startsWith("Bearer ")) {
            res.status(401).json({ message: "unauthenticated" });
        }

        const token = authorization.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userService.findEmail(payload.email);
        if (!user) {
            res.status(400).json({ message: "user not existed" });
        }

        req.user = payload;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authenticate;
