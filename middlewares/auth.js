const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { TOKEN_KEY } = process.env;

const verifyEmail = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).json("A token is required for authentication");
  }
  try {
    const decodedToken = jwt.verify(token, TOKEN_KEY);

    req.user = decodedToken;

    const user_id = req.user.user_id;

    const user = await User.findById(user_id);
    if (!user) return res.status(401).json({ message: "User doesn't exists." });

    if (user.status === "Pending")
      return res.status(401).json({
        message: "Pending Account. Please Verify Your Email!",
      });
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyEmail;
