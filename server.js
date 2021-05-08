const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });
const app = require("./app");

mongoose.connect(process.env.DATABASE_LOCAL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {console.log('database is connected')});

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Application running at port ${port}`)
})