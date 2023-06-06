const bull = require("bull");
const axios = require("axios");
const redisClient = require("../config/redisClient");

const Ping = require("../models/ping");
const Check = require("../models/check");
class Consumer {
  constructor() {
    this.queueName = "checks_queue";
    this.concurrency = 2;
  }

  start() {
    axios.interceptors.request.use((req) => {
      req.meta = req.meta || {};
      req.meta.requestStartedAt = new Date().getTime();
      return req;
    });

    axios.interceptors.response.use(
      (res) => {
        res.durationInMs =
          new Date().getTime() - res.config.meta.requestStartedAt;
        return res;
      },
      (res) => {
        res.durationInMs =
          new Date().getTime() - res.config.meta.requestStartedAt;
        throw res;
      }
    );

    const queue = new bull(this.queueName, { redis: { client: redisClient } });

    queue.process(this.concurrency, async (job) => {
      try {
        console.log(job.data);
        const createdAt = Date.now();
        const { durationInMs } = await axios.get(
          `${job.data.protocol}://${job.data.url}`
        );
        this.successPing(job.data, durationInMs, createdAt);
      } catch (err) {
        this.failedPing(job.data);
      }

      setTimeout(() => {
        queue.add(job.data);
      }, job.data.interval * 1000);
    });
  }

  async successPing(check, durationInMs, createdAt) {
    // if check.status was down
    // send email

    if (check.status === "down") {
      // await send email
    }

    let upTime = check.uptime;
    uptime += durationInMs / 1000; //response time in seconds
    uptime += check.interval; //time since last ping

    const result = await Ping.create({
      check: check._id,
      createdAt,
      responseTime: durationInMs,
      status: 200,
      url: check.url,
    });

    const update = {
      upTime: uptime,
    };

    result = await Check.updateOne({ _id: check._id }, update);
  }

  async failedPing(check, createdAt) {
    if (check.status === "up") {
      // await send email
    }

    let downTime = check.downTime;

    if (check.threshold) downTime += timeout * threshold;

    const result = await Ping.create({
      check: check._id,
      createdAt,
      responseTime: 0,
      status: 500,
      url: check.url,
    });

    const update = {
      downTime: downTime,
      outages: check.outages++,
      status: "down",
    };

    result = await Check.updateOne({ _id: check._id }, update);
  }
}

module.exports = Consumer;
