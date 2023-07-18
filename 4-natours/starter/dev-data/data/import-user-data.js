const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('DB connection succesful');
  });

// Reading data from some file
const allUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
);
// console.log(allTours);

// Import data into database
const importData = async (allUsers) => {
  try {
    const users = allUsers.map((user) => {
      delete user.id;
      return user;
    });

    await User.create(users);
    console.log('Data successfully imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete existing data from database
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') importData(allUsers);

if (process.argv[2] === '--delete') deleteData();
