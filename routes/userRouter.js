const express = require("express");
const userController = require("./../controller/userController");
const authController = require("../controller/authController");



const router = express.Router();

router.route('/')
    .post(userController.createUser)
    .get(authController.protect,authController.restrict('admin'),userController.getUsers);

router.post('/signup',authController.signup);
router.post('/login',authController.login);

router.patch('/updateMypassword', authController.protect, authController.updatePassword);
router.patch('/image/:img',authController.uploadPhoto,authController.imageUpload);

router.post('/forget',authController.forgetPassword);
router.patch('/reset/:token',authController.resetPassword);

router.route('/:staff_id')
    .delete(userController.deleteUser)
    .get(userController.getUser)
    .patch(userController.updateUser);

module.exports = router;