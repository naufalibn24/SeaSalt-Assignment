module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "EMAIL_EXIST":
      code = 409;
      message = "Email already exist";
      break;
    case "USERNAME_EXIST":
      code = 409;
      message = "Username already exist";
      break;
    case "DATA_EXIST":
      code = 409;
      message = "Data already exist";
    case "NOT_FOUND":
      code = 404;
      message = "Either Username or Email or Password combination not found";
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      message = "There is no data available";
    case "FORBIDDEN":
      code = 403;
      message = "No access";
      break;
    case "INVALID_TOKEN":
      code = 401;
      message = "Invalid access token";
      break;
    default:
      code = 500;
      message = "Internal Server Error!";
  }
  console.log(err);
  res.status(code).json({ success: false, message });
};
