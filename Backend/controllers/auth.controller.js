import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import generatetoken from "../utils/generatetoken.js";
export const signup = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({
        error: "password doesnt match",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        error: "username already exits",
      });
    }
    //HASHED PASSWORD
    const hashedPass = await bcrypt.hash(password, 10);
    const boysProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlsProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const newUser = new User({
      fullname,
      username,
      password: hashedPass,
      gender,
      profilepic: gender === "male" ? boysProfile : girlsProfile,
    });
    if (newUser) {
      //generate jwt token
      generatetoken(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilepic,
      });
    } else {
      res.status(400).json({
        error: "invalid user info",
      });
    }
  } catch (error) {
    console.error("error in signup controller :", error.message);
    res.status(500).json({
      error: "internal server error",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generatetoken(user._id, res);
    await user.save();
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilepic,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
