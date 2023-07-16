const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const {createNewUser, deleteAllUsers} = require('./authRepository');
const {deleteAllAuthors} = require('./authorRepository');
const {deleteAllBooks} = require('./booksRepository');

require('dotenv').config();

const MONGODB_URL = process.env.DB_URL;

console.log('connecting to', MONGODB_URL);

async function connectDB() {
  const URL = process.env.DB_URL;
  console.log({URL});
  console.log('started connecting');
  await mongoose.connect(URL).then(() => {
    console.log('connected to MongoDB');
  }).catch((e) => {
    console.log('Error connecting to MongoDB: ', e.message);
  });
}

async function disconnectDB() {
  return await mongoose.disconnect();
}

async function resetDB() {
  await deleteAllUsers();
  await deleteAllAuthors();
  await deleteAllBooks();

  const newUser = {username: 'testUser', password: 'testPassword'};
  await createNewUser(newUser);
}


module.exports = {connectDB, resetDB, disconnectDB};

