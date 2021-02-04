const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require("dotenv").config();
class SMTPemail {
    static _idActivation(req, res, next) {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
          user: process.env.Email,
          pass: process.env.Password,
        },
      });
      const jwtSecret = process.env.jwt_active;
      const payload = { username: req.body.username, email: req.body.email };
      const verifyingToken = jwt.sign(payload, jwtSecret);
      console.log(verifyingToken)
      
      let mailOptions = {
        from: process.env.Email,
        to: req.body.email,
        subject: "Sea Account Activation",
        html: `       
              <div class="container" style="margin-left:20em; margin-top:2em;" >
                  <img src="https://previews.123rf.com/images/kaisorn/kaisorn1604/kaisorn160400066/55954440-wood-table-top-with-blue-sea-background.jpg" style="width: 40em; border-radius: 1em ; margin-bottom:0em;" alt="">
                  <div style="background-color:#141414;border-radius: 1em; margin-top:0em; width:40em;">
                    <h4 style="color:cyan; word-wrap: break-word; width: 35em; padding:1em;">${verifyingToken}</h4>
                  </div>
              </div>
          `,
      };
  
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          res.json({ Error: err });
        } else {
          res.status(201).json({
            success: true,
            message: `Only one few step, a Verification code sent to ${
              req.body.email
            }`
          });
        }
      });
    }
}
module.exports = SMTPemail