const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img/users");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-userID-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Accepts only images", false);
  }
};

// const upload = multer({dest: 'public/img/users'});
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhoto = upload.single("photo");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  // remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: "successful",
    token,
    user,
  });
};

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      user: null,
      error,
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  let user;

  if (!email || !password)
    return next(new AppError("Please provide email and password", 401));

  // checking if user and password exist
  user = await User.findOne({ email }).select("+password");
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email and password", 401));
  } else {
    // Sign in to token
    createSendToken(user, 201, res);
  }
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Checking for token and if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to gain access", 401)
    );
  }

  // token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError(
        "Sorry user does not exist, please log in to gain access",
        401
      )
    );

  // Check if password is changed
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    res.status(401).json({
      err: "User recently changed password, please log in to gain access",
    });
  }

  // Grant access to the protected route
  req.user = freshUser;
  next();
});

exports.getUser = catchAsync(async (req, res, next) => {
  let token;

  // Checking for token and if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in, please log in to gain access", 401)
    );
  }

  // token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "Sorry user does not exist, please log in to gain access",
        401
      )
    );
  } else {
    res.status(200).json({
      status: "success",
      data: freshUser,
    });
  }
});

exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission", 401));
    }
    next();
  };
};

exports.forgetPassword = catchAsync(async (req, res, next) => {
  // Get user based on posted email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("Email address does not exist", 404));

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send token to users email
  try {
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/reset/${resetToken}`;
    const message = `Use the link to reset your password ${resetUrl}s`;

    await sendEmail({
      email: user.email,
      subject: "Your password reset token valid for 10 min",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to mail",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // if token has not expired and there is user, set new password
  if (!user) return next("Token is invalid or time has expired", 401);

  user.password = req.body.password;
  user.confirmPassword = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Log user in send jwt
  createSendToken(user, 201, res);
});

exports.updatePassword = async (req, res) => {
  // Get user from collection
  const user = await User.findById(req.user._id).select("+password");

  // Check if posted current password is correct
  if (!(await user.correctPaword(req.body.passwordCurrent, user.password))) {
    res.status(400).json({
      status: "failed",
      message: "Message did not send",
      error,
    });
  }

  //If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();
  // User.findByIdAndUpdate will not work as intended

  // Log user in, send token
  createSendToken(user, 200, res);
};

// exports.updateMe = catchAsync(async (req, res, next) => {
//     // 1) Create error if user POSTs password data
//     if (req.body.password || req.body.passwordConfirm) {
//       return next(
//         new AppError(
//           'This route is not for password updates. Please use /updateMyPassword.',
//           400
//         )
//       );
//     }

//     // 2) Filtered out unwanted fields names that are not allowed to be updated
//     const filteredBody = filterObj(req.body, 'name', 'email');
//     if (req.file) filteredBody.photo = req.file.filename;

//     // 3) Update user document
//     const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//       new: true,
//       runValidators: true
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         user: updatedUser
//       }
//     });
//   });

// image upload
exports.imageUpload = (req, res, next) => {
  res.status(200).json({
    file: req.file,
  });
};
