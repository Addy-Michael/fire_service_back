const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const userRoute = require("./routes/userRouter");
const recordRoute = require("./routes/recordRouter");
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
app.use(
  "/img/users",
  express.static(path.resolve(__dirname, "client", "img", "users"))
);
app.use("/js", express.static(path.resolve(__dirname, "client", "js")));
app.use(compression());

// setting routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/records", recordRoute);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/fire_service_front/index.html");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
