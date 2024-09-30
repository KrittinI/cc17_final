require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const userRouter = require("./routes/user-route");
const accountRouter = require("./routes/account-route");
const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/user", userRouter);
app.use("/account", authenticate, accountRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Hello Server port ${PORT}`);
});
