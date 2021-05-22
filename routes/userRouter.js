const express = require("express");
const userController = require("./../controller/userController");
const authController = require("../controller/authController");

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getUsers
  );

router.route("/latest_users").get(userController.getNewUsers);

router.route("/user").get(authController.getUser);

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.patch(
  "/updateMypassword",
  authController.protect,
  authController.updatePassword
);

router.post("/forget", authController.forgetPassword);
router.patch("/reset/:token", authController.resetPassword);

router
  .route("/:staff_id")
  .delete(userController.deleteUser)
  .get(userController.getUser)
  .patch(
    authController.protect,
    authController.uploadPhoto,
    authController.resizePhoto,
    userController.updateUser
  );

module.exports = router;
