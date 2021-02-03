const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    const emailCheck = await User.findOne({ where: { email: email } });
    const usernameCheck = await User.findOne({ where: { username: username } });

    if (emailCheck) {
      console.log(emailCheck);
      next({ name: "EMAIL_EXIST" });
    } else {
      if (usernameCheck) {
        next({ name: "USERNAME_EXIST" });
      } else {
        const newuser = new User({
          username,
          email,
          password,
        });
        newuser.save();
      }
    }
    next()
  }
  static async login (req, res, next){
    const {email,username,password} = req.body
    try{
      const check = await User.findOne({$or:[{email},{username}]})
      const pass = await bcrypt.compare(password,check.password)
      console.log(check)
      if (check && pass){
        if(check.role === "unregistered"){
          return res.status(200).json({success:true,msg:`Verifying code are sent to this ${check.email}`})
        }
        else{
          const token =  'Bearer' + jwt.sign({
            id: user.id
          }, process.env.jwt_secret, {
            expiresIn: 86400 //24h expired
          });
          res.status(201).json({
            success: true,
            message: `${username || email} has successfully login`,
            token:token,
          });
        }
      } else {
          next({ name: "NOT_FOUND" })
      }
    }
    catch{
      next({ name: "NOT_FOUND"})
    }
  }
  static async confirmUser(req, res, next) {
    const { verifyingToken } = req.body;

    try {
      const secret = process.env.JWT_Activate;
      await jwt.verify(verifyingToken, secret, async (err, decoded) => {
        if (!decoded) {
          next({ name: "INVALID_TOKEN" });
        } else {
          const email = decoded.email;
          const Found = await User.findOne({
            email,
          });
          const secret_key = process.env.JWT_Accesstoken;
          const access_token = jwt.sign({ _id: Found._id }, secret_key);
          const response = res.status(201).json({
            success: true,
            message: `${email} has successfully login`,
            access_token,
            role: `${Found.role}`,
          });
          if (Found.role === "unregistered") {
            await User.findOneAndUpdate({ email }, { $set: { role: "user" } });
            return response;
          } else {
            response;
          }
        }
      });
    } catch {
      next({ name: "INVALID_TOKEN" });
    }
  }
}

module.exports = UserController;
