const {Book} = require('./BookSchema');

async function deleteAllBooks() {
  return await Book.deleteMany({});
}

async function createBook({title, authorId, published, genres}) {
  return await Book.create({
    title: title,
    author: authorId,
    published: published,
    genres: genres,
  });
}

module.exports = {deleteAllBooks, createBook};
