const prisma = require("../model/prisma");

const userService = {};
userService.createUser = (data) => prisma.user.create({ data });

userService.findEmail = (email) =>
    prisma.user.findFirst({
        where: { email: email },
    });

userService.findPhone = (phone) =>
    prisma.user.findFirst({
        where: { phone: phone },
    });

module.exports = userService;
