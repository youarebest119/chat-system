const express = require("express");
const errorMiddleware = require("./middlewares/error");
const dotenv = require("dotenv");
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const cors = require('cors');
dotenv.config();
const app = express();


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(cors({
    origin: "*"
}));


mongoose.Promise = global.Promise;
const connectDb = async () => {
    await mongoose.connect(process.env.DB_URI, {});
}

connectDb();

const userRoutes = require("./routes/user");
const messageRoutes = require("./routes/message");
app.use("/api/v1", userRoutes);
app.use("/api/v1/inbox", messageRoutes);

app.get('/', function (req, res) {
    res.status(200).send(`Welcome`);
});
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Ohh you are lost, read the API documentation to find your way back home :)',
        success: false,
    })
});

app.use(errorMiddleware)

module.exports = app;