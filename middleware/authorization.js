const User = require("../models/User");

const user = async (req, res, next) => {
  const This = await User.findOne(req.id);
  if (This.role == "user") {
    next();
  } else {
    next({ name: "FORBIDDEN" });
  }
};

module.exports = user;
