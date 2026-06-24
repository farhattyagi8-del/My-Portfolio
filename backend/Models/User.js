const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      default: null
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      required: false,
    },
    otp:{
      type: String,
      default: null,
    },
    otpExpire:{
      type: Date,
      default: null,
    },
     resetPasswordToken: {
      type: String,
      default: null
    },
    googleId: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: false,
      default: 'local',
    },
    photo: {
      type: String,
      required: false,
    },
    givenName: {
      type: String,
      required: false,
    },
    familyName: {
      type: String,
      required: false,
    },
    locale: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);


