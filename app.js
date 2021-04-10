const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRouter");
const recordRoute = require("./routes/recordRouter");
const globalErrorHandler = require("./controller/errorHandler");
const AppError = require("./utils/appError");


const app = express();



// development
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

// setting routes
app.use('/api/v1/users',userRoute);
app.use('/api/v1/records',recordRoute);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;