const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

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
const allTours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);
// console.log(allTours);

// Import data into database
const importData = async (allTours) => {
  try {
    const tours = allTours.map((tour) => {
      delete tour.id;
      return tour;
    });

    await Tour.create(tours);
    console.log('Data successfully imported');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete existing data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') importData(allTours);

if (process.argv[2] === '--delete') deleteData();

// console.log(process.argv);
