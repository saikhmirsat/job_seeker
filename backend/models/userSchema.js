import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["Job Seeker", "Employer"],
  },
}, {
  versionKey: false,
  timestamps: true
});


// //ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

// //COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// //GENERATING A JWT TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH. 
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

export const User = mongoose.model("User", userSchema);

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   // userID: {
//   //     type: String,
//   // },
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },

//   phone: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   role: {
//     type: String,
//     required: true,
//     enum: ["Job Seeker", "Employer"],
//   },
// }, {
//   timestamps: true,
//   versionKey: false,
// });

// export const User = mongoose.model("User", userSchema);