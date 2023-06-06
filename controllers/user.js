const User = require("../models/user");
const Check = require("../models/check");
const Ping = require("../models/ping");

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

exports.getCheckReport = async (req, res, next) => {
  const user_id = req.user.user_id;
  const url = req.query.url;

  console.log(user_id);
  console.log(url);

  const check = await Check.find({ user: user_id, url: url });
  console.log(check);
  const result = await Ping.find({ check: check[0]._id });

  let totalResponsetTime = 0;

  let numberOfRecords = result.length;

  result.forEach((r) => {
    totalResponsetTime += r.responseTime;
  });

  let avgResponseTime = totalResponsetTime / numberOfRecords;

  const resMessage = {
    url: url,
    status: 200,
    avgResponseTime,
  };

  return res.status(200).json(resMessage);
};

exports.deleteAllPings = async (req, res, next) => {
  await Ping.deleteMany({});
  res.status(200).json({ message: "all pings are deleted" });
};
