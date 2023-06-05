const User = require("../models/user");
const Check = require("../models/check");

exports.postAddCheck = async (req, res, next) => {
  console.log("test controller: ", req.body);

  return res.status(200).json(req.body);
};
