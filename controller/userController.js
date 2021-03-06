const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("./../models/userModel");

// Create user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      status: "successful",
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error,
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ staffID: req.params.staff_id });

    res.status(200).json({
      status: "successful",
      user: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error,
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    if (req.file) req.body.photo = req.file.filename;
    console.log(req.file);
    const user = await User.findOneAndUpdate(
      { staffID: req.params.staff_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "successful",
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      error,
    });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.find({ staffID: req.params.staff_id });

    res.status(200).json({
      status: "successful",
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({
      status: "successful",
      length: user.length,
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error,
    });
  }
};

// GET NEW RECORDS
exports.getNewUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().skip(0).limit(4).sort("-createdAt");

  res.status(200).json({
    status: "successful",
    results: users.length,
    users,
  });
});
