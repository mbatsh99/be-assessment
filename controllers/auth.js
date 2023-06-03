const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  const token = jwt.sign(
    {
      user_id: id,
      email,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

exports.PostAddUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Data not Valid." });

    const checkUser = await User.findOne({ email });

    if (checkUser)
      return res.status(409).json({ message: "User Already Exists." });

    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      status: "Pending",
    });

    const token = createToken(user._id, email);

    return res.status(200).json({ email, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.postSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Data not Valid." });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid Email or Password." });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(400).json({ message: "Invalid Email or Password." });

    const token = createToken(user._id, email);

    return res.status(201).json({ email, token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong." });
  }
};
