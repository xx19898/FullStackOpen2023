
const {Book} = require('./BookSchema');

async function deleteAllBooks() {
  return await Book.deleteMany({});
}

async function createBook({title, authorId, published, genres}) {
  const createdUser = await Book.create({
    title: title,
    author: authorId,
    published: published,
    genres: genres,
  });

  const populatedUser = await Book
      .findOne({_id: createdUser._id})
      .populate('author');

  return populatedUser;
}

async function getAllBooks(genre) {
  const books = await Book.find({}).populate('author');
  if (genre === undefined) return books;
  const rightBooks = !genre ? books : books.filter((book) => {
    return book.genres.some((booksGenre) => booksGenre === genre);
  });
  return rightBooks;
}

module.exports = {deleteAllBooks, createBook, getAllBooks};
