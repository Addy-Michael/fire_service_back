const express = require("express");
const router = express.Router();

router.get('/login',(req,res) => {
    // res.sendFile('../fire_service_front/signin.html');
    // res.end('hello');
    res.sendFile('./../fire_service_front/index.html');
})

module.exports = router;