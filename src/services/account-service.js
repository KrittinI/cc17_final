const prisma = require("../model/prisma");

const accountService = {};

accountService.findAccountName = (accountName) =>
    prisma.account.findFirst({
        where: { accountName: accountName },
    });
accountService.findAccountId = (accountId) =>
    prisma.account.findFirst({
        where: { id: accountId },
    });

accountService.createAccount = (accountDetail) =>
    prisma.account.create({ data: accountDetail });

accountService.getAllAccount = (userId) =>
    prisma.account.findMany({
        where: { userId: userId },
    });

accountService.updateAccount = (accountId, data) =>
    prisma.account.update({
        where: { id: accountId },
        data: {
            accountType: data?.accountType,
            accountName: data?.accountName,
            amount: data?.amount,
        },
    });

accountService.deleteAccount = (accountId) =>
    prisma.account.update({
        where: { id: accountId },
        data: {
            isActive: false,
        },
    });

module.exports = accountService;
