const User = require("../models/User");
const Res = require("../helper/res");

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
        res.status(201).json({ success: true, newuser });
      }
    }
  }
}

module.exports = UserController;
