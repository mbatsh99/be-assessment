const User = require("../models/user");

exports.postAddCheck = async (req, res, next) => {
  const user = await User.findById(req.user.user_id);
  return res.status(200).json({ message: `Hello ${user.email}` });
};
