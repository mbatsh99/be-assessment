const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).json({ message: "yay you are on port 3000" });
});

axios.interceptors.request.use((req) => {
  req.meta = req.meta || {};
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axios.interceptors.response.use(
  (res) => {
    res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt;
    return res;
  },
  (res) => {
    res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt;
    throw res;
  }
);

router.get("/check", async (req, res, next) => {
  const headers = {
    Accept: "application/json",
    "Accept-Encoding": "identity",
  };

  const url = req.query.url;
  console.log(url);
  try {
    const { data, durationInMs } = await axios.get(url, { headers });
    console.log(data);
    return res.status(200).json({
      response: {
        status: data.status,
        duration: durationInMs,
      },
    });
  } catch (err) {
    return res.status(200).json({ message: "website not valid" });
  }
});

module.exports = router;
