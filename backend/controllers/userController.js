import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


// Register User
export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    console.log(req.body);

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill out the entire registration form!"
      });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already registered!"
      });
    }
    console.log(isEmail);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password!"
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password!"
      });
    }

    const LoginUser = await User.findOne({ email });

    const token = jwt.sign({ id: user._id, role: user.role }, 'saikh', {
      expiresIn: "1h"
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
      LoginUser
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logged out successfully!"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
