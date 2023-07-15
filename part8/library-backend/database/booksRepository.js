const {Book} = require('./BookSchema');

async function deleteAllBooks() {
  return await Book.deleteMany({});
}

module.exports = {deleteAllBooks};
