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
    default:
      code = 500;
      message = "Internal Server Error!";
  }
  console.log(err);
  res.status(code).json({ success: false, message });
};
