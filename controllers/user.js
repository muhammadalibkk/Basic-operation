const User = require("../db/models/user");

class UserController {
  async getUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await User.query().findById(id);
      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
      res.success = false;
    }
  }

  async getAllUser(req, res, next) {
    try {
      const user = await User.query();
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await User.query().insert(req.body);
      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
      res.success = false;
    }
  }
}

module.exports = new UserController();
