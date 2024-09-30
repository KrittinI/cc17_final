const e = require("express");
const accountService = require("../services/account-service");
const createError = require("../utils/create-error");
const transactionService = require("../services/transaction-service");

const accountController = {};

accountController.createAccount = async (req, res, next) => {
    try {
        const existsAccount = await accountService.findAccountName(
            req.body.accountName
        );
        if (existsAccount) {
            return res
                .status(400)
                .json({ message: "account name is already in used" });
        }

        if (
            req.body.accountType !== "SAVINGS" &&
            req.body.accountType !== "FIXED" &&
            req.body.accountType !== "CURRENT"
        ) {
            return res.status(400).json({ message: "invalid account type" });
        }

        const data = req.body;
        data.userId = req.user.id;
        if (!data.amount) {
            data.amount = 0;
        }

        console.log(data);
        await accountService.createAccount(data);

        res.status(201).json({ message: "account created" });
    } catch (error) {
        next(error);
    }
};

accountController.getAllAccount = async (req, res, next) => {
    try {
        const result = await accountService.getAllAccount(req.user.id);

        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

accountController.updateAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;

        const existsAccount = await accountService.findAccountId(+accountId);
        if (!existsAccount) {
            return res.status(400).json({ message: "invalid Account" });
        }

        if (existsAccount.userId !== req.user.id) {
            return res
                .status(400)
                .json({ message: "no permission for this account" });
        }

        if (req.body.accountName) {
            const existsAccountName = await accountService.findAccountName(
                req.body.accountName
            );

            if (existsAccountName) {
                return res
                    .status(400)
                    .json({ message: "this account name has been used" });
            }
        }

        const data = { ...existsAccount, ...req.body };

        await accountService.updateAccount(+accountId, data);
        res.status(200).json({
            accountType: data.accountType,
            accountName: data.accountName,
            amount: data.amount,
        });
    } catch (error) {
        next(error);
    }
};

accountController.deleteAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;

        const existsAccount = await accountService.findAccountId(+accountId);
        if (!existsAccount) {
            return res.status(400).json({ message: "invalid Account" });
        }

        if (existsAccount.userId !== req.user.id) {
            return res
                .status(403)
                .json({ message: "no permission for this account" });
        }

        await accountService.deleteAccount(+accountId);

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

accountController.createTransaction = async (req, res, next) => {
    try {
        const senderId = await accountService.findAccountId(req.body.senderId);
        if (!senderId) {
            return res.status(400).json({ message: "invalid account" });
        }

        if (senderId.userId !== req.user.id) {
            return res
                .status(400)
                .json({ message: "no premission for this account" });
        }

        if (senderId.amount < req.body.amount) {
            return res
                .status(400)
                .json({ message: "amount in account not enough" });
        }

        const receiverId = await accountService.findAccountId(
            req.body.receiverId
        );
        if (!receiverId) {
            return res.status(402).json({ message: "invalid account" });
        }

        if (receiverId.id === senderId.id) {
            return res.status(400).json({ message: "invalid transaction" });
        }

        if (
            req.body.transactionType !== "EXPENSES" &&
            req.body.transactionType !== "INCOME" &&
            req.body.transactionType !== "TRANSFER"
        ) {
            return res
                .status(400)
                .json({ message: "invalid tarnsaction type" });
        }

        await transactionService.createTransaction(
            req.body,
            senderId,
            receiverId
        );

        res.status(201).json({ message: "transaction created" });
    } catch (error) {
        next(error);
    }
};

accountController.getAllTransaction = async (req, res, next) => {
    try {
        const { accountId } = req.params;

        const result = await transactionService.getAllTransaction(
            Number(accountId)
        );

        res.status(200).json({ result });
    } catch (error) {
        next(error);
    }
};

module.exports = accountController;
