const User = require('../models/users.model')
const helper = require('../utils/helper.util');

async function getMultiple(page = 1, limit = 10, name) {
  const offset = helper.getOffset(page, limit);
  let query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' }
  }
  
  const [{ data, totalCount }] = await User.aggregate([{
    $facet: {
      data: [
        { $match: query },
        { $skip: offset },
        { $limit: limit * 1 },
      ],
      totalCount: [
        { $match: query },
        { $count: 'total' }
      ]
    }
  }]);

  const res = helper.emptyOrRows(data);
  const meta = {
    page,
    total: totalCount[0].total
  };

  return {
    res, meta
  }
}

async function getOne(nik) {
  return await User.findOne({ nik: nik });
}

async function create(userData) {
  try {
    const newData = await User.create({
      nik: userData.nik,
      name: userData.name,
      email: userData.email,
      age: userData.age,
      address: userData.address
    });

    return {
      success: true,
      message: 'User created successfully',
      user: newData,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getMultiple,
  getOne,
  create
}