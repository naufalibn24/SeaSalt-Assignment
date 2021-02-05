const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    var JWT_Accesstoken = process.env.jwt_secret;
    const decodes = jwt.verify(access_token, JWT_Accesstoken);
    req.id = decodes;
    next();
  } else {
    next({ name: "INVALID_TOKEN" });
  }
};

module.exports = authentication;
