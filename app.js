const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoute = require("./routes/userRouter");
const recordRoute = require("./routes/recordRouter");
const viewRoute = require("./routes/viewRoute");
const globalErrorHandler = require("./controller/errorHandler");
const AppError = require("./utils/appError");

const app = express();

app.use(cors());

// development
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/css", express.static(path.resolve(__dirname, "client", "css")));
app.use("/img", express.static(path.resolve(__dirname, "client", "img")));
app.use("/js", express.static(path.resolve(__dirname, "client", "js")));

// setting routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/records", recordRoute);
// app.use('/firefighters',viewRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/fire_service_front/index.html");
});

// app.get('/login',(req,res) => {
//     res.sendFile(__dirname + '/fire_service_front/signin.html');
// });

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
