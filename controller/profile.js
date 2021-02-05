const Profile = require("../models/Profile");
const User = require("../models/User");

class ProfileController {
  static async UserProfile(req, res, next) {
    const { firstName, lastName } = req.body;
    const userid = req.id;
    const user = await User.findByPk(userid.id);
    const userprofile = await Profile.findOne({
      where: { userId: userid.id },
    });

    console.log(userprofile);
    if (user.role != "unregistered") {
      if (!userprofile) {
        if (userprofile) {
          next({ name: "PROFILE_EXIST" });
        } else {
          const images = req.file.path;
          const profile = new Profile({
            userId: userid.id,
            firstName,
            lastName,
            images: images,
            fullName: firstName + lastName,
          });
          profile.save();
          res.status(201).send({
            success: true,
            message: "Profile Created",
            profile,
          });
        }
      } else {
        next({ name: "DATA_EXIST" });
      }
    } else {
      next({ name: "FORBIDDEN" });
    }
  }
  static imageProfile(req, res, next) {
    const images = req.file.path;
    Profile.update(
      { images: images },
      {
        where: { userId: req.id.id },
      }
    )
      .then(() => {
        res.status(201).json({ msg: "Profile Picture has changes", images });
      })
      .catch(next);
  }
}

module.exports = ProfileController;
