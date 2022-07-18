const { user } = require('../configs/db.config');
const users = require('../services/users.service');

async function get(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page, req.query.limit, req.query.name));
  } catch (err) {
    console.error(`Error while getting users`, err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    var exist = await users.getOne(req.body.nik);
    if (exist) {
      return res.status(400).json({
        success: false,
        message: 'User NIK already exists',
      });
    }

    res.json(await users.create(req.body));
  } catch (err) {
    if (err.name == 'ValidationError') {
      let message;
      const key = Object.keys(err.errors);
      if (err.errors[key[0]] && err.errors[key[0]].properties) {
        message = err.errors[key[0]].properties.message;
      }
      return res.status(400).json({
        success: false,
        message: message,
      });
    }
    console.error(`Error while creating user`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create
};