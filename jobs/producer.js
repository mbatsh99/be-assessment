const cron = require("node-cron");
const Check = require("../models/check");
const redisClient = require("../config/redisClient");
const bull = require("bull");

class Producer {
  constructor() {
    this.schedule = "* * * * *";
    this.queueName = "checks_queue";
  }

  start() {
    const queue = new bull(this.queueName, { redis: { client: redisClient } });
    queue
      .empty()
      .then(function () {
        console.log("queue flushed");
      })
      .catch(function (err) {
        console.log(err);
      });
    cron.schedule(this.schedule, async () => {
      try {
        const checks = await Check.find();

        for (let i = 0; i < checks.length; i++) queue.add(checks[i]);

        // await queue.add(b);
      } catch (err) {
        console.error("Error fetching Checks:", err);
      }
    });
  }
}

module.exports = Producer;
