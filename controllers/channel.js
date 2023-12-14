const User = require("../db/models/user");
const expressPinoLogger = require('express-pino-logger');
const pino = require('pino');
const logger = pino();

class ChannelController {
  async getUsersByChannelId(req, res, next) {
    try {
      const { channelId } = req.params;
      const users = await User.query()
        .where("channelId", channelId)
        .withGraphFetched("channel");
        logger.info({
          data:users
        });
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
}

module.exports = new ChannelController();
