const express = require('express');
const channelController = require('../controllers/channel');

const router = express.Router();
// TODO move implementation to controller and service layer
router.get('/:channelId', channelController.getUsersByChannelId);

module.exports = router;