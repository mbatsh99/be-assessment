const axios = require("axios");

const checks = [
  { id: 1, url: "www.facebook.com", interval: 3 },
  { id: 2, url: "www.instagram.com", interval: 3 },
  { id: 3, url: "www.reddit.com", interval: 3 },
  { id: 4, url: "www.discord.com", interval: 3 },
  { id: 5, url: "www.riot.com", interval: 3 },
  { id: 6, url: "www.apple.com", interval: 3 },
  { id: 7, url: "www.samsung.com", interval: 3 },
];

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

const workForever = () => {
  checks.forEach((check) => {
    setInterval(() => {
      callUrl(check.url);
    }, check.interval * 1000);
  });
};

const callUrl = async (url) => {
  try {
    console.log("testurl: ", url);
    const { durationInMs } = await axios.get(url);
    console.log(`Pinged id: ${check.id} ${url}: ${durationInMs}`);
  } catch (err) {
    console.error(`Error pinging ${url.url}: ${err.message}`);
  }
};

const test = async () => {
  const response = await axios.get("www.samsung.com");
  console.log(response.status);
  /*
  checks.forEach(async (check) => {
    const response = await axios.get(check.url);
    console.log(`${check.url} : ${response.status}`);
  });
  */
};

test();

//workForever();
