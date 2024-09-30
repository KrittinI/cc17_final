const userService = require("../services/user-service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {};

userController.register = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({
                message: "password and confirmPassword is mismatched",
            });
        }

        const existsEmail = await userService.findEmail(req.body.email);
        if (existsEmail) {
            return res
                .status(400)
                .json({ message: "email or phone already in used" });
        }

        const existsPhone = await userService.findPhone(req.body.phone);
        if (existsPhone) {
            return res
                .status(400)
                .json({ message: "email or phone already in used" });
        }

        const data = req.body;

        delete data.confirmPassword;
        data.password = await bcrypt.hash(data.password, 10);

        await userService.createUser(data);

        res.status(201).json({ message: "user created", data });
    } catch (error) {
        next(error);
    }
};

userController.login = async (req, res, next) => {
    try {
        const findUser = await userService.findEmail(req.body.email);
        if (!findUser) {
            return res
                .status(400)
                .json({ message: "email or password incorrect" });
        }

        const hashPassword = await bcrypt.compare(
            req.body.password,
            findUser.password
        );
        if (!hashPassword) {
            return res
                .status(400)
                .json({ message: "email or password incorrect" });
        }

        const data = findUser;
        delete data.password;

        const accessToken = jwt.sign(data, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        data.accessToken = accessToken;

        res.json({ data });
    } catch (error) {
        next(error);
    }
};

module.exports = userController;
