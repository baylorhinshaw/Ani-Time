const db = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

db.once('open', async () => {
  await User.deleteMany({});

  const Users = await User.insertMany(userData);

  console.log('Users Seeded!');
  console.log(Users)
  process.exit(0);
});
