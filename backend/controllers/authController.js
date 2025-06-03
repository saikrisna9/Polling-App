const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Poll = require("../models/Poll.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  const { fullName, username, email, password, profileImageUrl } = req.body;

  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const usernameRegex = /^[a-zA-Z0-9-]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Invalid username. Only alphanumeric characters and hypens are allowed. No spaces are permitted",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      profileImageUrl,
    });
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

   const totalPollsCreated = await Poll.countDocuments({creator:user._id});

   const totalPollsVotes = await Poll.countDocuments({
    voters : user._id
   });

   const totalPollsBookmarked = user.bookmarkedPolls.length;


    res
      .status(200)
      .json({
        id: user._id,
        user: {
          ...user.toObject(),
          totalPollsCreated,
          totalPollsVotes,
          totalPollsBookmarked,
        },
        token:generateToken(user._id)
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in Logining user", error: err.message });

  }
};
exports.getUserInfo = async (req, res) => {
    try{
        const user= await  User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const totalPollsCreated = await Poll.countDocuments({creator:user._id});

   const totalPollsVotes = await Poll.countDocuments({
    voters : user._id
   });

   const totalPollsBookmarked = user.bookmarkedPolls.length;

        const userInfo = {
            ...user.toObject(),
            totalPollsCreated,
            totalPollsVotes,
            totalPollsBookmarked
        }
        res.status(200).json(userInfo)
    }
    catch (err) {
        res
          .status(500)
          .json({ message: "Error in getting  user", error: err.message });
    
      }
};
