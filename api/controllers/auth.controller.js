import User from "../Models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const generateRandomPassword = length => Array(length).fill().map(() => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+'[Math.floor(Math.random() * 78)]).join('');


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
    // const userData = dbUser.toObject();
    // delete userData.password;
    res
      .cookie("tokens", token, { secure: false, httpOnly: true })
      .status(201)
      .json(rest)
      // .json({
      //   status: true,
      //   message: "logged in suceesfully",
      //   data: rest,
      // });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      const { password: pass, ...rest } = existingUser._doc;
      
      res
        .cookie("tokens", token, { secure: false, httpOnly: true })
        .status(200)
        .json(rest);
    }
    else{
      //const { username, email, name } = req.body;
      const passwordRandom = generateRandomPassword(20)
      const hashedPassword = bcryptjs.hashSync(passwordRandom)
      //username with random number and letter at the end
      const newUser = User({username: req.body.name.split(" ").join("").toLowerCase() + generateRandomPassword(5), email: req.body.email, password: hashedPassword , 
      avatar: req.body.photo
    })
    await newUser.save()
    const newUserToken = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
    const {password:pass, ...rest} = newUser._doc
    res
    .cookie("token",newUserToken, { httpOnly: true })
    .status(200)
    .json(rest)


    }
  } catch (err) {
    next(errorHandler(400, err.message));
  }
};
