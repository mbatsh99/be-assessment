const User = require("../models/user");
const Check = require("../models/check");

exports.postAddCheck = async (req, res, next) => {
  try {
    const {
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeout,
      interval,
      threshold,
      tags,
      ignoreSSL,
    } = req.body;

    // add check to the database.

    const user_id = req.user.user_id;

    const checkUrl = await Check.findOne({ url });

    if (checkUrl)
      return res.status(401).json({ message: "url check already exists" });

    const check = await Check.create({
      name,
      url,
      protocol,
      path,
      port,
      webhook,
      timeout,
      interval,
      threshold,
      tags,
      ignoreSSL,
      user: user_id,
    });

    console.log("user_id: ", user_id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong." });
  }

  return res.status(200).json(req.body);
};
