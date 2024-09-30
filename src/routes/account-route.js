const express = require("express");
const accountController = require("../controllers/account-controller");

const accountRouter = express.Router();

accountRouter.post("/", accountController.createAccount);
accountRouter.get("/", accountController.getAllAccount);
accountRouter.patch("/:accountId", accountController.updateAccount);
accountRouter.delete("/:accountId", accountController.deleteAccount);
accountRouter.post(
    "/:accountId/transaction",
    accountController.createTransaction
);
accountRouter.get(
    "/:accountId/transaction",
    accountController.getAllTransaction
);

module.exports = accountRouter;
