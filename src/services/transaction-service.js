const prisma = require("../model/prisma");

const transactionService = {};

transactionService.createTransaction = (data, sender, receiver) =>
    prisma.$transaction(async (tx) => {
        await tx.account.update({
            where: {
                id: data.senderId,
            },
            data: {
                amount: Number(sender.amount) - data.amount,
            },
        });
        await tx.account.update({
            where: {
                id: data.receiverId,
            },
            data: {
                amount: Number(receiver.amount) + data.amount,
            },
        });

        await tx.transaction.create({ data });
    });

transactionService.getAllTransaction = (account) =>
    prisma.transaction.findMany({
        where: {
            OR: [{ receiverId: account }, { senderId: account }],
        },
    });

module.exports = transactionService;
