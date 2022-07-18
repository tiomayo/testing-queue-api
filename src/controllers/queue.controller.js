const queue = require('../services/queue.service');

async function get(req, res, next) {
  try {
    res.json(await queue.get(req.query));
  } catch (err) {
    console.error(`Error while get queue`, err.message);
    next(err);
  }
}

module.exports = {
  get
};