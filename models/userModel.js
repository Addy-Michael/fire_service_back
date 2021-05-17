const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "A first name is required"],
  },
  surname: {
    type: String,
    required: [true, "A surname is required"],
  },
  gender: {
    type: String,
    required: [true, "A surname is required"],
    enum: ["male", "female"],
  },
  dob: {
    type: Date,
    required: [true, "A date of birth is required"],
  },
  email: {
    type: String,
    required: [true, "email address is require"],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "password is require"],
    // custom validation
    validate: {
      // val returns the value enter in the field
      validator: function (val) {
        return val == this.password;
      },
      message: "Password are not the same",
    },
  },
  role: {
    type: String,
    required: [true, "password is require"],
    default: "staff",
    enum: ["admin", "staff"],
  },
  staffID: {
    type: String,
    required: [true, "password is require"],
    unique: true,
  },
  contact: {
    type: Number,
    required: [true, "contact is require"],
  },
  photo: { type: String, default: "profile.jpg" },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

// Instance method, it runs on all the documents
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // returning plan text - what will be sent to the user through the mail
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
