import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  //get the info from the browser
  const { username, email, password } = req.body;
  //const saltRounds = 10;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email)

  try {
    const dbUser = await User.findOne({ email });
    if (!dbUser) return next(errorHandler(400, "user not found"));

    const validPassword = bcryptjs.compareSync(password, dbUser.password);
    if (!validPassword)
      return next(errorHandler(400, "invalid user_credentials"));

    const token = jwt.sign({ id: dbUser.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const { password: pass, ...rest } = dbUser._doc;
    const userData = dbUser.toObject();
    delete userData.password;
    res
    .cookie("tokens", token, { secure: false, httpOnly: true })
    .status(201)
    .json({
      status: true,
      message: "logged in suceesfully",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
